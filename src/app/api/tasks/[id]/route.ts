import { NextRequest, NextResponse } from 'next/server';
import type { Task, UpdateTaskBody } from '@/types';
import db from '@/lib/database';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const task = db
      .prepare('SELECT * FROM tasks WHERE id = ?')
      .get(id) as Task | undefined;

    if (!task) {
      return NextResponse.json(
        { error: 'Task no encontrada' },
        { status: 404 }
      );
    }

    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la tarea' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: UpdateTaskBody = await request.json();
    const { title, description, completed } = body;

    const currentTask = db
      .prepare('SELECT * FROM tasks WHERE id = ?')
      .get(id) as Task | undefined;

    if (!currentTask) {
      return NextResponse.json(
        { error: 'Task no encontrada' },
        { status: 404 }
      );
    }

    const updatedTitle = title ?? currentTask.title;
    const updatedDescription = description ?? currentTask.description;
    const updatedCompleted =
      completed !== undefined ? (completed ? 1 : 0) : currentTask.completed;

    const stmt = db.prepare(
      'UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    stmt.run(updatedTitle, updatedDescription, updatedCompleted, id);

    const updatedTask = db
      .prepare('SELECT * FROM tasks WHERE id = ?')
      .get(id) as Task;

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la tarea' },
      { status: 500 }
    );
  }
}
