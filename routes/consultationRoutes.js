import express from "express";

import {
  createConsultation,
  getConsultations,
  updateConsultationStatus,
  deleteConsultation,
} from "../controllers/consultationController.js";
import protectAdmin
from "../middleware/authMiddleware.js";

const router =
  express.Router();

/* CREATE */

router.post(
  "/",
  createConsultation
);

/* GET */

router.get(
  "/",
  protectAdmin,
  getConsultations
);

/* UPDATE STATUS */

router.patch(
  "/:id",
  protectAdmin,
  updateConsultationStatus
);

/* DELETE */

router.delete(
  "/:id",
  protectAdmin,
  deleteConsultation
);

export default router;