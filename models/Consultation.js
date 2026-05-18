import mongoose from "mongoose";

const consultationSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      businessName: {
        type: String,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
      },

      serviceInterest: {
        type: String,
        required: true,
      },

      preferredDate: {
        type: String,
      },

      projectDetails: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "New",
          "Contacted",
          "Meeting Scheduled",
          "Closed",
        ],
        default: "New",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Consultation",
  consultationSchema
);