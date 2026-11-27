import AppError from "../utils/AppError.js";
import pool from "../config/database.js";

//* Connect to DB
const client = await pool.connect();

// GET: /tasks
// export const getTasksController = (req, res, next) => {
//   const user = false;

//   if (!user) {
//     return next(new AppError("Error testing!", 404));
//   }

//   res
//     .json({
//       message: "Get all tasks",
//       statusCode: 200,
//     })
//     .status(200);
// };

//! GET: Get all tasks
export const getAllTasksController = async (req, res, next) => {
  //* Make a query
  const results = await client.query(`
    SELECT * FROM simple_tasks;
    `);

  //* Check if the data is empty
  if (results.rows.length === 0) {
    //! Forward error to error middleware
    return next(new AppError("❌ Failed to fetch the data", 404));
  }

  //* Make a respond to client
  res.status(200).json({
    message: "🌱 Successfully fetch the data.",
    status: 200,
    results,
  });
};
