import express from "express";
import Score from "../models/Score.js";

const router = express.Router();

// POST /scores — Save a new score
router.post("/scores", async (req, res) => {
  const { name, score, module, difficulty } = req.body;

  if (!name || score == null || !module || !difficulty) {
    return res.status(400).json({ error: "Name, score, module, and difficulty are required" });
  }

  try {
    const newScore = new Score({ name, score, module, difficulty });
    await newScore.save();
    res.status(201).json({ message: "Score saved", score: newScore });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Failed to save score" });
  }
});

// GET /scores/leaderboard — Fetch top scores
// Example: /scores/leaderboard?module=Interval%20Recognition&difficulty=Easy&limit=10
router.get("/scores/leaderboard", async (req, res) => {
  const { module, difficulty, limit = 10 } = req.query;

  if (!module || !difficulty) {
    return res.status(400).json({ error: "Module and difficulty are required" });
  }

  try {
    const scores = await Score.find({ module, difficulty })
      .sort({ score: -1, date: 1 }) // Highest score first, earliest date as tiebreaker
      .limit(parseInt(limit));

    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

export default router;
