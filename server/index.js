import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import dotenv from "dotenv";
import Score from "./models/Score.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

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

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
