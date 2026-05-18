import express from "express";

import {
  loginAdmin,
} from "../controllers/adminAuthController.js";

const router =
  express.Router();

/* LOGIN */

router.post(
  "/login",
  loginAdmin
);

export default router;