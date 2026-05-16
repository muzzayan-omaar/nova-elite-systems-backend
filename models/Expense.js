import mongoose from "mongoose";

const expenseSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      vendor: {
        type: String,
        default: "",
      },

      paymentMethod: {
        type: String,
        default: "",
      },

      expenseDate: {
        type: String,
        required: true,
      },

      notes: {
        type: String,
        default: "",
      },

      receipt: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Expense",
  expenseSchema
);