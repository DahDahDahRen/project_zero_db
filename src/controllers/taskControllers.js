import AppError from "../utils/AppError.js";

// GET: /tasks
export const getTasksController = (req, res, next) => {
  const user = false;

  if (!user) {
    return next(new AppError("Error testing!", 404));
  }

  res
    .json({
      message: "Get all tasks",
      statusCode: 200,
    })
    .status(200);
};
