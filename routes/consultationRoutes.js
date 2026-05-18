import express from "express";

import {
  createConsultation,
  getConsultations,
  updateConsultationStatus,
  deleteConsultation,
} from "../controllers/consultationController.js";

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
  getConsultations
);

/* UPDATE STATUS */

router.patch(
  "/:id",
  updateConsultationStatus
);

/* DELETE */

router.delete(
  "/:id",
  deleteConsultation
);

export default router;