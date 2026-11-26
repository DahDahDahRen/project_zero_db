const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  console.error("ERROR:", err);

  // Error sustained during development
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  // Error during production
  if (err.isOperational) {
    return res.status(statusCode).json({
      status,
      message: err.message,
    });
  }

  // Generic Error
  return res.status(500).json({
    status: "error",
    message: "Something went wrong on the server.",
  });
};

export default errorHandler;
