import Template from "../models/Template.js";
import { generateSlug } from "../utils/generateSlug.js";

/**
 * CREATE TEMPLATE
 */
export const createTemplate = async (req, res) => {
  try {
    const baseSlug = generateSlug(req.body.title);

    // ensure uniqueness
    let slug = baseSlug;
    let counter = 1;

    while (await Template.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const template = await Template.create({
      ...req.body,
      slug,
    });

    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL TEMPLATES
 */
export const getTemplates =
  async (req, res) => {

    try {

      const templates =
        await Template.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        templates
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch templates",
        error: error.message,
      });
    }
  };

/**
 * GET SINGLE TEMPLATE
 */
export const getTemplateBySlug = async (req, res) => {
  try {
    const template = await Template.findOne({
      slug: req.params.slug,
    });

    if (!template) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE TEMPLATE
 */
export const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    let slug = template.slug;

    if (req.body.title && req.body.title !== template.title) {
      const baseSlug = generateSlug(req.body.title);

      slug = baseSlug;
      let counter = 1;

      while (
        await Template.findOne({
          slug,
          _id: { $ne: template._id },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        slug,
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE TEMPLATE
 */
export const deleteTemplate =
  async (req, res) => {

    try {

      await Template.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Template deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to delete template",
        error: error.message,
      });
    }
  };