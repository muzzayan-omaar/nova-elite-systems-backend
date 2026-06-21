import express from "express";

import {
  createQuotation,
  getQuotations,
  deleteQuotation,
  createFromRequirement,
} from "../controllers/quotation.controller.js";
import {
  downloadQuotationPDF,
} from "../controllers/quotationPdf.controller.js";

const router = express.Router();

router.post("/", createQuotation);
router.post("/from-requirement/:id", createFromRequirement);

router.get("/", getQuotations);
router.delete("/:id", deleteQuotation);

router.get(
  "/:id/pdf",
  downloadQuotationPDF
);

export default router;