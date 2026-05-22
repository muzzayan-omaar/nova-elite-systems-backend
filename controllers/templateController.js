import Template from "../models/Template.js";

/**
 * CREATE TEMPLATE
 */
export const createTemplate =
  async (req, res) => {

    try {

      const template =
        await Template.create(req.body);

      res.status(201).json(template);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to create template",
        error: error.message,
      });
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
export const getTemplateBySlug =
  async (req, res) => {

    try {

      const template =
        await Template.findOne({
          slug: req.params.slug,
        });

      if (!template) {

        return res
          .status(404)
          .json({
            message:
              "Template not found",
          });
      }

      res.status(200).json(
        template
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch template",
        error: error.message,
      });
    }
  };

/**
 * UPDATE TEMPLATE
 */
export const updateTemplate =
  async (req, res) => {

    try {

      const template =
        await Template.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json(
        template
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to update template",
        error: error.message,
      });
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