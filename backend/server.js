// Import express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
// Middleware
app.use(express.json());
// Only parse JSON for POST, PUT, PATCH requests
// app.use((req, res, next) => {
//   if (["POST", "PUT", "PATCH"].includes(req.method)) {
//     express.json()(req, res, next);
//   } else {
//     next();
//   }
// });
app.use(express.static('frontend'));

//MongoDB connection
// const mongoURI= "mongodb+srv://admin:GSchar4@feedbackdb.ivknsns.mongodb.net/?retryWrites=true&w=majority&appName=feedbackDB";
mongoose.connect(
 "mongodb+srv://admin:GSchar4@feedbackdb.ivknsns.mongodb.net/?retryWrites=true&w=majority&appName=feedbackDB"
)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error:", err));

//import routes
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);
// Basic route
app.get("/", (req, res) => {
  res.send("Smart Feedback System backend is running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
