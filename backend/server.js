const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
// Middleware
app.use(express.json());

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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
