import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    clientName: String,
    company: String,
    email: String,
    phone: String,

    projectTitle: String,
    projectType: String,
    pages: [String],
referenceLinks: [String],
notes: String,

    budget: Number,

    features: [String],

    description: String,

    deadline: String,

    status: {
      type: String,
      default: "Pending",
    },
    requirementId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Requirement",
  default: null,
},
  },
  { timestamps: true }
);

export default mongoose.model("Requirement", requirementSchema);