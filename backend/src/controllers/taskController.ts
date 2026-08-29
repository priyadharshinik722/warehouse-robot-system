import { Request, Response } from "express";
import { Task } from "../models/task";
import { robots } from "./robotController";

let tasks: Task[] = [];
let nextId = 1;

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const { description, priority } = req.body;

  if (!description) {
    return res.status(400).json({
      message: "Task description is required"
    });
  }

  const task: Task = {
  id: nextId++,
  description,
  status: "pending",
  priority: priority || "medium"
};

  tasks.push(task);

  res.status(201).json(task);
};

export const assignTask = (req: Request, res: Response) => {
  const taskId = Number(req.params.taskId);
  const robotId = Number(req.body.robotId);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const robot = robots.find((r) => r.id === robotId);

  if (!robot) {
    return res.status(404).json({
      message: "Robot not found",
    });
  }

  if (robot.status !== "available") {
    return res.status(400).json({
      message: `Robot is currently ${robot.status}`,
    });
  }

  if (robot.battery < 20) {
    return res.status(400).json({
      message: "Robot battery is too low",
    });
  }

  task.robotId = robotId;
  task.status = "assigned";

  robot.status = "busy";

  res.json(task);
};
  
export const scheduleTask = (req: Request, res: Response) => {
  const taskId = Number(req.params.taskId);
  const { scheduledTime } = req.body;

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.scheduledTime = scheduledTime;
  task.status = "scheduled";

  res.json(task);
};
export const completeTask = (req: Request, res: Response) => {
  const taskId = Number(req.params.taskId);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  if (task.robotId) {
    const robot = robots.find((r) => r.id === task.robotId);

    if (robot) {
      robot.status = "available";
    }
  }

  task.status = "completed";

  res.json(task);
};