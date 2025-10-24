// Import dependencies
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
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import routes
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// Serve frontend (Render / Production)
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Basic route (for testing)
// app.get("/", (req, res) => {
//   res.send("Smart Feedback System backend is running!");
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});






















// // Import express
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// // Middleware
// app.use(express.json());
// // Only parse JSON for POST, PUT, PATCH requests
// // app.use((req, res, next) => {
// //   if (["POST", "PUT", "PATCH"].includes(req.method)) {
// //     express.json()(req, res, next);
// //   } else {
// //     next();
// //   }
// // });
// app.use(express.static('frontend'));
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// //MongoDB connection
// const mongoURI= "mongodb+srv://admin:GSchar4@feedbackdb.ivknsns.mongodb.net/?retryWrites=true&w=majority&appName=feedbackDB";
// mongoose.connect(
//  mongoURI
// )
// .then(() => console.log("MongoDB connected successfully"))
// .catch((err) => console.log("MongoDB connection error:", err));

// //import routes
// const feedbackRoutes = require("./routes/feedbackRoutes");
// app.use("/api/feedback", feedbackRoutes);
// // Serve frontend files when deployed
// app.use(express.static(path.join(__dirname, "../frontend")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend", "index.html"));
// });

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Smart Feedback System backend is running!");
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
