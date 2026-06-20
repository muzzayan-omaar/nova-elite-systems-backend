import express from "express";

import {
  createAgreement,
  getAgreements,
  deleteAgreement,
  createFromScope,
} from "../controllers/agreement.controller.js";

const router = express.Router();

router.post("/", createAgreement);
router.post("/from-scope/:id", createFromScope);

router.get("/", getAgreements);
router.delete("/:id", deleteAgreement);

export default router;