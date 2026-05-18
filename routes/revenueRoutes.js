import express from "express";

import {
  getRevenueAnalytics,
} from "../controllers/revenueController.js";
import protectAdmin
from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/analytics",
  protectAdmin,
  getRevenueAnalytics
);

export default router;