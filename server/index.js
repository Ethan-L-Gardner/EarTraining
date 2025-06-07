import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // ✅ Keep this
import dotenv from "dotenv";
import Score from "./models/Score.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => console.error("❌ MongoDB error:", err));

// Test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is working!" });
});


// ---------------------------
// POST /api/scores
// ---------------------------
// Save a user's score to MongoDB
app.post("/api/scores", async (req, res) => {
  try {
    const { name, score, module, difficulty } = req.body;

    if (!name || score == null) {
      return res.status(400).json({ error: "Name and score are required" });
    }

    const newScore = new Score({ name, score, module, difficulty });
    const saved = await newScore.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------------------
// GET /api/scores
// ---------------------------
// Return the top 10 high scores
app.get("/api/scores", async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 }) // Highest first
      .limit(10);          // Only top 10

    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
