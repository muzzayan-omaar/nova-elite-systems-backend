import express from "express";

import {
  createScope,
  getScopes,
  deleteScope,
  createFromQuotation,
} from "../controllers/projectScope.controller.js";

const router = express.Router();

router.post("/", createScope);
router.post("/from-quotation/:id", createFromQuotation);

router.get("/", getScopes);
router.delete("/:id", deleteScope);

export default router;