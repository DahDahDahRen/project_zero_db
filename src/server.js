import app from "./app.js";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    // Connect to PostgresSQL
    await connectDB();

    // Start server
    app.listen(port, () => {
      console.log(
        `✔️ Server is running at PORT: `,
        port,
        `

        🖥️ http://localhost:${port}
        Personal Project by Jan Joshua Macanip
        Location: Philippines
        `,
      );
    });
  } catch (error) {
    console.error(`❌ Failed to start the server ,because`, error.message);
  }
};

start();
