import express from "express";

import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../controllers/expenseController.js";

const router =
  express.Router();

router.post(
  "/",
  createExpense
);

router.get(
  "/",
  getExpenses
);

router.delete(
  "/:id",
  deleteExpense
);

router.put(
  "/:id",
  updateExpense
);

export default router;