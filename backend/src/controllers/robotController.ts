import { Request, Response } from "express";
import { Robot } from "../models/robot";

export let robots: Robot[] = [
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

export const getRobots = (req: Request, res: Response) => {
  res.json(robots);
};

export const addRobot = (req: Request, res: Response) => {
  const { name, status, battery } = req.body;

  const newRobot: Robot = {
    id: robots.length + 1,
    name,
    status: status || "available",
    battery: battery ?? 100
  };

  robots.push(newRobot);

  res.status(201).json(newRobot);
};