import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Score from "./models/Score.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser tools like Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browsers
};

app.use(cors(corsOptions));
app.use(express.json());

// Explicitly handle OPTIONS preflight requests
app.options("*", cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

// Test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Your POST /api/scores route here (example)
app.post("/api/scores", async (req, res) => {
  try {
    // Example: save score logic here
    // const score = new Score(req.body);
    // await score.save();
    res.status(201).json({ message: "Score saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Error handler middleware to prevent uncaught errors blocking CORS headers
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (err.message.startsWith("CORS policy")) {
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));