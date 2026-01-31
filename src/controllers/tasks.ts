import type { Request, Response } from "express";
import type { Task, CreateTaskBody } from "../types/index.js";
import db from "../database.js";

export const getAllTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = db.prepare("SELECT * FROM tasks ORDER BY created_at DESC").all() as Task[];
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const createTask = async (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response
): Promise<void> => {
  const { title, description, completed } = req.body;

  try {
    if (!title) {
      res.status(400).json({ error: "El título es requerido" });
      return;
    }

    const stmt = db.prepare(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)"
    );
    const result = stmt.run(title, description || "", completed ? 1 : 0);

    const newTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid) as Task;
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};
