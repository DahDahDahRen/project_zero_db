import AppError from "../utils/AppError.js";
import pool from "../config/database.js";

//* Connect to DB
const client = await pool.connect();

//! GET: Get all tasks
export const getAllTasksController = async (req, res, next) => {
  //* Make a query
  const results = await client.query(`
    SELECT * FROM simple_tasks ORDER BY id DESC;
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

//! POST: Create task
export const createTaskController = async (req, res, next) => {
  // * Get body data payload
  const { body } = req;

  // * Create a query string
  const query = `
    INSERT INTO simple_tasks (title, description, status, priority, due_date, is_completed, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  // * Get the values of the body data
  const data = Object.values(body);

  // * Make a insert query
  const result = await client.query(query, data);

  // ! Check if the query is successful
  if (result.rows.length === 0) {
    return next(new AppError("Failed to add new tasks", 404));
  }

  res.status(200).json({
    status: "✅ Success!",
    statusCode: 200,
    data: result.rows[0],
  });
};
