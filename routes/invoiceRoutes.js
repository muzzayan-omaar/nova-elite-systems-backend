import express from "express";

import {
  createInvoice,
  getInvoices,
  deleteInvoice,
  downloadInvoicePDF,
    updateInvoiceStatus,
} from "../controllers/invoiceController.js";
import protectAdmin
from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createInvoice);
  
router.get("/", protectAdmin, getInvoices);

router.delete("/:id", protectAdmin, deleteInvoice);

router.put(
  "/:id/status",
  protectAdmin,
  updateInvoiceStatus
);

router.get(
  "/pdf/:id",
  protectAdmin,
  downloadInvoicePDF
);

export default router;