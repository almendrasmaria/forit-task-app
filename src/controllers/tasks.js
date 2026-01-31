let tasks = [];
let nextId = 1;

export const getAllTask = async (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ error: "El título es requerido" });
    }

    const newTask = {
      id: nextId++,
      title,
      description: description || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};
