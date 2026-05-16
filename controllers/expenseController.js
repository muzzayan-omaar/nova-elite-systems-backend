import Expense from "../models/Expense.js";

/* CREATE EXPENSE */

export const createExpense =
  async (req, res) => {
    try {

      const expense =
        await Expense.create(
          req.body
        );

      res
        .status(201)
        .json(expense);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };

/* GET EXPENSES */

export const getExpenses =
  async (req, res) => {
    try {

      const expenses =
        await Expense.find()
          .sort({
            createdAt: -1,
          });

      res.json(expenses);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };

/* DELETE EXPENSE */

export const deleteExpense =
  async (req, res) => {
    try {

      await Expense.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Expense deleted",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };

/* UPDATE EXPENSE */

export const updateExpense =
  async (req, res) => {
    try {

      const expense =
        await Expense.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(expense);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };