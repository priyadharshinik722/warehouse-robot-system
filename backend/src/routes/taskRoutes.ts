import express from "express";
import {
  getTasks,
  createTask,
  assignTask,
  scheduleTask,
  completeTask
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:taskId/assign", assignTask);
router.put("/:taskId/schedule", scheduleTask);
router.put("/:taskId/complete", completeTask);

export default router;