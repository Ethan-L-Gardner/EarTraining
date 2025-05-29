import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  module: { type: String, required: true },     
  difficulty: { type: String, required: true }, 
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", scoreSchema);
export default Score;