import mongoose from "mongoose";

const supportTicketSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      company: {
        type: String,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
      },

      serviceType: {
        type: String,
        required: true,
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "Urgent",
        ],
        default: "Medium",
      },

      issue: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "New",
          "In Progress",
          "Resolved",
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
  "SupportTicket",
  supportTicketSchema
);