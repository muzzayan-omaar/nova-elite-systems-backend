import express from "express";
import Requirement from "../models/Requirement.model.js";
import ProjectScope from "../models/ProjectScope.model.js";

import {
  createScope,
  getScopes,
  deleteScope,
  createFromQuotation,
  createFromRequirement
} from "../controllers/projectScope.controller.js";

const router = express.Router();

router.post("/", createScope);
router.post("/from-quotation/:id", createFromQuotation);

router.get("/", getScopes);
router.delete("/:id", deleteScope);

router.post(
  "/from-requirement/:id",
  createFromRequirement
);

export default router;