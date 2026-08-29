"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTask = exports.scheduleTask = exports.assignTask = exports.createTask = exports.getTasks = void 0;
const robotController_1 = require("./robotController");
let tasks = [];
let nextId = 1;
const getTasks = (req, res) => {
    res.json(tasks);
};
exports.getTasks = getTasks;
const createTask = (req, res) => {
    const { description, priority } = req.body;
    if (!description) {
        return res.status(400).json({
            message: "Task description is required"
        });
    }
    const task = {
        id: nextId++,
        description,
        status: "pending",
        priority: priority || "medium"
    };
    tasks.push(task);
    res.status(201).json(task);
};
exports.createTask = createTask;
const assignTask = (req, res) => {
    const taskId = Number(req.params.taskId);
    const robotId = Number(req.body.robotId);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }
    const robot = robotController_1.robots.find((r) => r.id === robotId);
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
exports.assignTask = assignTask;
const scheduleTask = (req, res) => {
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
exports.scheduleTask = scheduleTask;
const completeTask = (req, res) => {
    const taskId = Number(req.params.taskId);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }
    if (task.robotId) {
        const robot = robotController_1.robots.find((r) => r.id === task.robotId);
        if (robot) {
            robot.status = "available";
        }
    }
    task.status = "completed";
    res.json(task);
};
exports.completeTask = completeTask;
