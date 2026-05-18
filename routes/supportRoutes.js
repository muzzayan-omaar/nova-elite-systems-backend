import express from "express";

import {
  createSupportTicket,
  getSupportTickets,
  updateSupportTicket,
  deleteSupportTicket,
} from "../controllers/supportController.js";
import protectAdmin
from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE */
router.post(
  "/",
  createSupportTicket
);

/* GET ALL */
router.get(
  "/",
  protectAdmin,
  getSupportTickets
);

/* UPDATE */
router.patch(
  "/:id",
  protectAdmin,
  updateSupportTicket
);

/* DELETE */
router.delete(
  "/:id",
  protectAdmin,
  deleteSupportTicket
);

export default router;