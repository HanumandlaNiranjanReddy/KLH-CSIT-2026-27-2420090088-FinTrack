const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "Fintrack",
  password: process.env.DB_PASSWORD || "Fintrack@123",
  port: Number(process.env.DB_PORT || 5432),
});
pool.on("connect", () => {
  console.log("PostgreSQL connected");
});
pool.on("error", (error) => {
  console.error("PostgreSQL error:", error);
});
module.exports = pool;