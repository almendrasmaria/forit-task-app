import { NextRequest, NextResponse } from 'next/server';
import type { Task, CreateTaskBody } from '@/types';
import db from '@/lib/database';

export async function GET() {
  try {
    const tasks = db
      .prepare('SELECT * FROM tasks ORDER BY created_at DESC')
      .all() as Task[];
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las tareas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskBody = await request.json();
    const { title, description, completed } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'El título es obligatorio' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();

    const stmt = db.prepare(
      'INSERT INTO tasks (id, title, description, completed) VALUES (?, ?, ?, ?)'
    );
    stmt.run(id, title, description || '', completed ? 1 : 0);

    const newTask = db
      .prepare('SELECT * FROM tasks WHERE id = ?')
      .get(id) as Task;

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la tarea' },
      { status: 500 }
    );
  }
}
