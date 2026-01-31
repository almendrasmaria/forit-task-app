import { Router, type Router as RouterType } from "express";
import { getAllTask, createTask, deleteTaskById, updateTask } from "../controllers/tasks.js";

const router: RouterType = Router();

router.get("/", getAllTask);
router.post("/", createTask);
router.delete("/:id", deleteTaskById);
router.put("/:id", updateTask);

export default router;
