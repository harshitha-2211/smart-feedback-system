const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// POST feedback with sentiment analysis
router.post("/", async (req, res) => {
  try {
    const { user_id, name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = sentiment.analyze(message);
    const sentimentLabel =
      result.score > 0 ? "Positive" : result.score < 0 ? "Negative" : "Neutral";

    const newFeedback = new Feedback({
      user_id: user_id || null,
      name,
      email,
      message,
      sentiment: sentimentLabel,
      createdAt: new Date(),
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      sentiment: sentimentLabel,
      score: result.score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET summary of feedback
router.get("/summary", async (req, res) => {
  try {
    const summary = await Feedback.aggregate([
      {
        $match: { sentiment: { $ne: null } }  // ignore null sentiment
      },
      {
        $group: { //aggregates docus by the sentiment field
          _id: "$sentiment",
          count: { $sum: 1 } //counts no.of documents per sentiment
        }
      }
    ]);

    const counts = { Positive: 0, Negative: 0, Neutral: 0 };
    summary.forEach(item => {
      if (item._id && counts.hasOwnProperty(item._id)) {
        counts[item._id] = item.count;
      }
    });
    res.json(counts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// GET all feedback for admin feedback tableee
router.get("/all", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); 
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

module.exports = router;


































// const express = require("express");
// const router = express.Router();
// const Feedback = require("../models/feedbackModel");

// // POST feedback
// router.post("/", async (req, res) => {
//   try {
//     const { user_id, name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const newFeedback = new Feedback({ user_id: user_id||null, 
//         name, email, message });
//     await newFeedback.save();

//     res.status(201).json({ message: "Feedback submitted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // GET summary of feedback (sentiment counts)
// router.get("/summary", async (req, res) => {
//   try {
//     // Dummy data for now
//     const summary = {
//       Positive: 5,
//       Negative: 2,
//       Neutral: 3
//     };

//     res.json(summary);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;







// app.post("/api/feedback", async (req, res) => {
//   try {
//     // Check if the body is an array (multiple feedbacks)
//     if (Array.isArray(req.body)) {
//       await Feedback.insertMany(req.body);
//       res.status(201).json({ message: "Multiple feedbacks saved successfully!" });
//     } else {
//       // Single feedback
//       const newFeedback = new Feedback(req.body);
//       await newFeedback.save();
//       res.status(201).json({ message: "Feedback saved successfully!" });
//     }
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     res.status(500).json({ message: "Error saving feedback" });
//   }
// });
