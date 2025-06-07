import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Score from "./models/Score.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Define allowed origins (adjust/add your frontends here)
const allowedOrigins = [
  process.env.FRONTEND_URL,          // your main frontend URL, e.g. https://your-site.netlify.app
  "http://localhost:5173",           // Vite default dev server port
  "http://localhost:3000",           // React default dev server port (if applicable)
].filter(Boolean); // removes any undefined/null

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like Postman or mobile apps
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
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

