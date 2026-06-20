import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    clientName: String,
    company: String,
    email: String,
    phone: String,

    projectTitle: String,
    projectType: String,

    budget: Number,

    features: [String],

    description: String,

    deadline: String,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Requirement", requirementSchema);