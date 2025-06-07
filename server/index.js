import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import scoresRouter from "./routes/scores.js";  // Adjust path if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl requests with no origin
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle OPTIONS preflight requests for all routes
app.options("*", cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Use the scores router for all /api routes
app.use("/api", scoresRouter);

// Error handling middleware for CORS errors and others
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (err.message && err.message.startsWith("CORS policy")) {
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});