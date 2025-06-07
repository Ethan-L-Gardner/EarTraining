import express from "express";
import Score from "../models/Score.js";

const router = express.Router();

router.post("/scores", async (req, res) => {
  const { name, score, module, difficulty } = req.body;

  if (!name || score == null) {
    return res.status(400).json({ error: "Name and score are required" });
  }

  try {
    const newScore = new Score({ name, score, module, difficulty });
    await newScore.save();
    res.status(201).json({ message: "Score saved", score: newScore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save score" });
  }
});

export default router;