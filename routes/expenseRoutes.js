import express from "express";

import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../controllers/expenseController.js";
import protectAdmin
from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  createExpense
);

router.get(
  "/",
  protectAdmin,
  getExpenses
);

router.delete(
  "/:id",
  protectAdmin,
  deleteExpense
);

router.put(
  "/:id",
  protectAdmin,
  updateExpense
);

export default router;