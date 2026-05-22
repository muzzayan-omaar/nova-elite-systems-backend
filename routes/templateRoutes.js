import express from "express";

import {
  createTemplate,
  getTemplates,
  getTemplateBySlug,
  updateTemplate,
  deleteTemplate,
} from "../controllers/templateController.js";

import protectAdmin
from "../middleware/authMiddleware.js";

const router =
  express.Router();

/**
 * PUBLIC
 */

router.get(
  "/",
  getTemplates
);

router.get(
  "/:slug",
  getTemplateBySlug
);

/**
 * ADMIN
 */

router.post(
  "/",
  protectAdmin,
  createTemplate
);

router.put(
  "/:id",
  protectAdmin,
  updateTemplate
);

router.delete(
  "/:id",
  protectAdmin,
  deleteTemplate
);

export default router;