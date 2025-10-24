// server.js
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb+srv://admin:GSchar4@feedbackdb.ivknsns.mongodb.net/?retryWrites=true&w=majority&appName=feedbackDB";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// Serve frontend (for production / Render)
app.use(express.static(path.join(__dirname, "../frontend")));

// Correct catch-all for SPA (admin.html or index.html)
app.get(["/admin", "/admin.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
