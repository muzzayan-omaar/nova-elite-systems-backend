import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/clients", clientRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Error:");
    console.log(err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});