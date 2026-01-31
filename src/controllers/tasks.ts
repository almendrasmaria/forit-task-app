import type { Request, Response } from "express";
import type { Task, CreateTaskBody, UpdateTaskBody } from "../types/index.js";
import db from "../database.js";

export const getAllTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const tasks = db
      .prepare("SELECT * FROM tasks ORDER BY created_at DESC")
      .all() as Task[];
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const createTask = async (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
): Promise<void> => {
  const { title, description, completed } = req.body;

  // generar ID único
  const id = crypto.randomUUID();

  try {
    if (!title) {
      res.status(400).json({ error: "El título es obligatorio" });
      return;
    }

    const stmt = db.prepare(
      "INSERT INTO tasks (id, title, description, completed) VALUES (?, ?, ?, ?)",
    );
    const result = stmt.run(id, title, description || "", completed ? 1 : 0);

    const newTask = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(id) as Task;
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

export const deleteTaskById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task;
    if (task) {
      db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
      res.status(204).json(task);
    } else {
      res.status(404).json({ error: "Task no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
  
export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskBody>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const currentTask = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(id) as Task | undefined;

    if (!currentTask) {
      res.status(404).json({ error: "Task no encontrada" });
      return;
    }

    const updatedTitle = title ?? currentTask.title;
    const updatedDescription = description ?? currentTask.description;
    const updatedCompleted = completed !== undefined ? (completed ? 1 : 0) : currentTask.completed;

    const stmt = db.prepare(
      "UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    );
    stmt.run(updatedTitle, updatedDescription, updatedCompleted, id);

    const updatedTask = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(id) as Task;
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};
