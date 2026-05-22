import mongoose from "mongoose";

const templateSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
      },

      category: {
        type: String,
        required: true,
      },

      shortDescription: {
        type: String,
      },

      fullDescription: {
        type: String,
      },

      thumbnail: {
        type: String,
        required: true,
      },

      gallery: [
        {
          type: String,
        },
      ],

      technologies: [
        {
          type: String,
        },
      ],

      features: [
        {
          type: String,
        },
      ],

      pagesIncluded: [
        {
          type: String,
        },
      ],

      price: {
        type: String,
      },

      setupPrice: {
        type: String,
      },

      demoUrl: {
        type: String,
      },

      featured: {
        type: Boolean,
        default: false,
      },

      popular: {
        type: Boolean,
        default: false,
      },

      status: {
        type: String,
        enum: [
          "draft",
          "published",
        ],
        default: "published",
      },

      seoTitle: {
        type: String,
      },

      seoDescription: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

const Template =
  mongoose.model(
    "Template",
    templateSchema
  );

export default Template;