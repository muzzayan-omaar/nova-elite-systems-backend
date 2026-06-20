import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema(
  {
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requirement",
      default: null,
    },

    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      default: null,
    },

    scopeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectScope",
      default: null,
    },

    agreementNumber: String,

    clientName: String,
    company: String,
    email: String,
    phone: String,

    projectTitle: String,
    projectType: String,

    terms: String,

    paymentTerms: String,

    startDate: String,
    deliveryDate: String,

    status: {
      type: String,
      default: "Draft", 
      // Draft | Sent | Signed | Rejected
    },

    signedAt: Date,

    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Agreement", agreementSchema);