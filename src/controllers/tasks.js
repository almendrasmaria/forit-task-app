import db from "../database.js";

export const getAllTask = async (req, res) => {
  try {
    const tasks = db.prepare("SELECT * FROM tasks ORDER BY created_at DESC").all();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ error: "El título es requerido" });
    }

    const stmt = db.prepare(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)"
    );
    const result = stmt.run(title, description || "", completed ? 1 : 0);

    const newTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};
