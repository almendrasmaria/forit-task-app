import { Router, type Router as RouterType } from "express";
import { getAllTask, createTask } from "../controllers/tasks.js";

const router: RouterType = Router();

router.get("/", getAllTask);
router.post("/", createTask);

export default router;
