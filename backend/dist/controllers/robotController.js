"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRobot = exports.getRobots = exports.robots = void 0;
exports.robots = [
    {
        id: 1,
        name: "Robot-01",
        status: "available",
        battery: 100
    },
    {
        id: 2,
        name: "Robot-02",
        status: "charging",
        battery: 45
    }
];
const getRobots = (req, res) => {
    res.json(exports.robots);
};
exports.getRobots = getRobots;
const addRobot = (req, res) => {
    const { name, status, battery } = req.body;
    const newRobot = {
        id: exports.robots.length + 1,
        name,
        status: status || "available",
        battery: battery ?? 100
    };
    exports.robots.push(newRobot);
    res.status(201).json(newRobot);
};
exports.addRobot = addRobot;
