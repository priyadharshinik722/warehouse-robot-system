import { Router } from "express";
import { getRobots, addRobot } from "../controllers/robotController";

const router = Router();

router.get("/", getRobots);
router.post("/", addRobot);

export default router;