import express from "express";
import { getAllTasksController } from "../controllers/taskControllers.js";

const router = express.Router();

router.get("/", getAllTasksController);

export default router;
