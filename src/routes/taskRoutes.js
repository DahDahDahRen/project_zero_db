import express from "express";
import validation from "../middlewares/validation.js";
import {
  getAllTasksController,
  createTaskController,
} from "../controllers/taskControllers.js";

const router = express.Router();

//* GET
router.get("/", getAllTasksController);
router.post("/", validation, createTaskController);

export default router;
