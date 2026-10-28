const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
// ------------------------------------
// MIDDLEWARE
// ------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
];
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
// ------------------------------------
// HOME
// ------------------------------------
app.get("/", (req, res) => {
  res.json({
    message: "FinTrack backend is running",
  });
});
// ------------------------------------
// API ROUTES
// ------------------------------------
app.use("/api", routes);
// ------------------------------------
// START SERVER
// ------------------------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});