import express from "express";

import {
  createInvoice,
  getInvoices,
  deleteInvoice,
  downloadInvoicePDF,
    updateInvoiceStatus,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", createInvoice);

router.get("/", getInvoices);

router.delete("/:id", deleteInvoice);

router.put(
  "/:id/status",
  updateInvoiceStatus
);

router.get(
  "/pdf/:id",
  downloadInvoicePDF
);

export default router;