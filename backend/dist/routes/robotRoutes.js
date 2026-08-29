"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const robotController_1 = require("../controllers/robotController");
const router = (0, express_1.Router)();
router.get("/", robotController_1.getRobots);
router.post("/", robotController_1.addRobot);
exports.default = router;
