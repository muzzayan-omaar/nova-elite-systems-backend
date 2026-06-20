import mongoose from "mongoose";

const quotationItemSchema = new mongoose.Schema(
  {
    description: String,
    qty: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
  },
  { _id: false }
);

const quotationSchema = new mongoose.Schema(
  {
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requirement",
      default: null,
    },

    clientName: String,
    company: String,
    email: String,

    quotationNumber: String,

    projectTitle: String,
    projectType: String,

    scope: String,
    timeline: String,

    paymentTerms: String,

    notes: String,

    status: {
      type: String,
      default: "Draft", // Draft | Sent | Accepted | Rejected
    },

    items: [quotationItemSchema],

    subtotal: Number,
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", quotationSchema);