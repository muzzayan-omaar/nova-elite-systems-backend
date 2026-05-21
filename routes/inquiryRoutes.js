import express from "express";

import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
} from "../controllers/inquiryController.js";

import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * PUBLIC
 */

router.post("/", createInquiry);

/**
 * ADMIN
 */

router.get(
  "/stats",
  protectAdmin,
  getInquiryStats
);

router.get(
  "/",
  protectAdmin,
  getInquiries
);

router.get(
  "/:id",
  protectAdmin,
  getInquiryById
);

router.put(
  "/:id",
  protectAdmin,
  updateInquiryStatus
);

router.delete(
  "/:id",
  protectAdmin,
  deleteInquiry
);

export default router;