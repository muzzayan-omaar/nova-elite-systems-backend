import express from "express";
import {
  createRequirement,
  getRequirements,
  deleteRequirement,
} from "../controllers/requirement.controller.js";

const router = express.Router();

router.post("/", createRequirement);
router.get("/", getRequirements);
router.delete("/:id", deleteRequirement);

export default router;