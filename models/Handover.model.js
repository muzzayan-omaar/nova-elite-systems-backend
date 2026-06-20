import mongoose from "mongoose";

const handoverSchema = new mongoose.Schema(
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

    agreementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agreement",
      default: null,
    },

    handoverNumber: String,

    clientName: String,
    company: String,
    email: String,

    projectTitle: String,
    projectType: String,

    deliveredItems: [String],

    liveUrl: String,
    repositoryUrl: String,
    adminPanelUrl: String,

    credentials: {
      hosting: String,
      email: String,
      database: String,
    },

    assets: [String], // URLs (Cloudinary etc.)

    checklist: [
      {
        task: String,
        done: { type: Boolean, default: false },
      },
    ],

    status: {
      type: String,
      default: "Pending",
      // Pending | Delivered | Approved | Closed
    },

    deliveredAt: Date,

    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Handover", handoverSchema);