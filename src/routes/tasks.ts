import { Router, type Router as RouterType } from "express";
import { getAllTask, createTask, getTaskById, updateTask } from "../controllers/tasks.js";

const router: RouterType = Router();

router.get("/", getAllTask);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);

export default router;
