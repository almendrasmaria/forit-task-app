import { Router } from "express";
import { getAllTask, createTask } from "../controllers/tasks.js";

const router = Router();

router.get("/", getAllTask);
router.post("/", createTask);

export default router;