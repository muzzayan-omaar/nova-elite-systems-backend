import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import revenueRoutes from "./routes/revenueRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import supportEmailRoutes from "./routes/supportEmailRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";



dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nova-elite-systems.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  "/api/admin/auth",
  adminAuthRoutes
);

app.use("/api/inquiries", inquiryRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use(
  "/api/revenue",
  revenueRoutes
);
app.use(
  "/api/expenses",
  expenseRoutes
);
app.use(
  "/api/support",
  supportRoutes
);
app.use(
  "/api/support",
  supportEmailRoutes
);
app.use(
  "/api/consultations",
  consultationRoutes
);
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