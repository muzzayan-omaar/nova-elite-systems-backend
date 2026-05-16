import express from "express";

import {
  getRevenueAnalytics,
} from "../controllers/revenueController.js";

const router = express.Router();

router.get(
  "/analytics",
  getRevenueAnalytics
);

export default router;