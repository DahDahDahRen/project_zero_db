import express from "express";
import { getTasksController } from "../controllers/taskControllers.js";

const router = express.Router();

router.get("/", getTasksController);

export default router;
