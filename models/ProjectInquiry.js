import mongoose from "mongoose";

const projectInquirySchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      companyName: {
        type: String,
      },

      email: {
        type: String,
        required: true,
      },

      whatsapp: {
        type: String,
        required: true,
      },

      country: {
        type: String,
      },

      businessType: {
        type: String,
      },

      timeline: {
        type: String,
      },

      budget: {
        type: String,
      },

      description: {
        type: String,
      },

      service: {
        type: String,
        required: true,
      },

      packageName: {
        type: String,
      },

      packagePrice: {
        type: String,
      },

      startMethod: {
        type: String,
        enum: [
          "consultation",
          "deposit",
        ],
        default: "consultation",
      },

      status: {
        type: String,
        enum: [
          "new",
          "contacted",
          "proposal-sent",
          "in-progress",
          "completed",
          "closed",
          "rejected",
        ],
        default: "new",
      },
    },

    {
      timestamps: true,
    }
  );

const ProjectInquiry =
  mongoose.model(
    "ProjectInquiry",
    projectInquirySchema
  );

export default ProjectInquiry;