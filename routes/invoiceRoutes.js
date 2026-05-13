import express from "express";

import {
  createInvoice,
  getInvoices,
  deleteInvoice,
  downloadInvoicePDF,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", createInvoice);

router.get("/", getInvoices);

router.delete("/:id", deleteInvoice);

router.get(
  "/pdf/:id",
  downloadInvoicePDF
);

export default router;