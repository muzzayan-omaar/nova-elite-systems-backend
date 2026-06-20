import mongoose from "mongoose";

const projectScopeSchema = new mongoose.Schema(
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

    clientName: String,
    company: String,
    email: String,

    scopeNumber: String,

    projectTitle: String,
    projectType: String,

    objectives: String,

    deliverables: [String],

    includedFeatures: [String],

    excludedFeatures: [String],

    timeline: String,

    assumptions: String,

    notes: String,

    status: {
      type: String,
      default: "Draft", // Draft | Approved | Sent
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProjectScope", projectScopeSchema);