import express from "express";

import {
  createSupportTicket,
  getSupportTickets,
  updateSupportTicket,
  deleteSupportTicket,
} from "../controllers/supportController.js";

const router = express.Router();

/* CREATE */
router.post(
  "/",
  createSupportTicket
);

/* GET ALL */
router.get(
  "/",
  getSupportTickets
);

/* UPDATE */
router.patch(
  "/:id",
  updateSupportTicket
);

/* DELETE */
router.delete(
  "/:id",
  deleteSupportTicket
);

export default router;