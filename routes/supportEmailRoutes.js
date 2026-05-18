import express from "express";

import {
  sendSupportReply,
} from "../controllers/supportEmailController.js";

const router = express.Router();

router.post(
  "/reply",
  sendSupportReply
);

export default router;