import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  service: String,
  qty: Number,
  price: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    clientName: String,
    company: String,
    email: String,
    phone: String,

    invoiceNumber: {
      type: String,
      unique: true,
    },

    issueDate: String,
    dueDate: String,

    paymentMethod: String,
    bankName: String,
    accountName: String,
    accountNumber: String,

    status: {
      type: String,
      default: "Pending",
    },

    notes: String,

    tax: Number,

    subtotal: Number,
    total: Number,

    items: [invoiceItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Invoice",
  invoiceSchema
);