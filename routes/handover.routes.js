import express from "express";

import {
  createHandover,
  getHandovers,
  deleteHandover,
  createFromAgreement,
} from "../controllers/handover.controller.js";

const router = express.Router();

router.post("/", createHandover);
router.post("/from-agreement/:id", createFromAgreement);

router.get("/", getHandovers);
router.delete("/:id", deleteHandover);

export default router;