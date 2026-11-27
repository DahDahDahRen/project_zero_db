import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();

// ----------- App level middleware -----------
app.disable("etag");
app.use(morgan("dev"));
app.use(express.json());

// ----------- Routes -----------

//* Default route
app.get("/", (req, res) => {
  res.send("Joshua Project!");
});

//* Task routes
app.use("/tasks", taskRouter);

//* Error Handler
app.use(errorHandler);

export default app;
