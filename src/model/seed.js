import pool from "../config/database.js";
import tasksData from "./tasksData.js";

const seedCreator = async () => {
  // ! Connect to DB
  const client = await pool.connect();

  try {
    // ! What is this? LOL
    await client.query("BEGIN");

    // ! Ensure the table exist in DB
    await client.query(`
        CREATE TABLE IF NOT EXISTS simple_tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'TODO',
        priority TEXT DEFAULT 'MEDIUM',
        due_date DATE,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

    //! Wipe out existing rows and reset IDS back to 1
    await client.query("TRUNCATE TABLE simple_tasks RESTART IDENTITY CASCADE");

    //! Query code
    const insertQuery = `
        INSERT INTO simple_tasks (title, description, status, priority, due_date, is_completed, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    for (const taskData of tasksData) {
      const data = Object.values(taskData);
      await client.query(insertQuery, [...data]);
    }

    //! What is this? LOL
    await client.query("COMMIT");

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    //! What is this? LOL
    await client.query("ROLLBACK");

    console.error("❌ Error seeding database: ", error);

    //! What is this? LOL
    process.exitCode = 1;
  } finally {
    //! What is this? LOL
    client.release();

    //! What is this? LOL
    await pool.end();
  }
};

seedCreator();
