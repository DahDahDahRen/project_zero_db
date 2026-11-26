import pool from "./database.js";

const connectDB = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();

    console.log(`✔️ Connected successfully with PostgresSQL Database.`);
  } catch (error) {
    console.error(`❌ Failed to connect to PostgresSQL: `, error.message);

    process.exit(1);
  }
};

export default connectDB;
