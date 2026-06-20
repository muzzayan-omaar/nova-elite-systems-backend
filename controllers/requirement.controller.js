import Requirement from "../models/Requirement.model.js";

import ProjectScope from "../models/ProjectScope.model.js";

// CREATE
export const createRequirement = async (req, res) => {
  try {
    const data = await Requirement.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getRequirements = async (req, res) => {
  try {
    const data = await Requirement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteRequirement = async (req, res) => {
  try {
    await Requirement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createFromRequirement = async (
  req,
  res
) => {
  try {

    const requirement =
      await Requirement.findById(
        req.params.id
      );

    if (!requirement) {
      return res.status(404).json({
        message: "Requirement not found",
      });
    }

    const scope =
      await ProjectScope.create({
        requirementId:
          requirement._id,

        clientName:
          requirement.clientName,

        company:
          requirement.company,

        email:
          requirement.email,

        projectTitle:
          requirement.projectTitle,

        projectType:
          requirement.projectType,

        objectives:
          requirement.description,

        deliverables:
          requirement.features,

        includedFeatures:
          requirement.features,

        excludedFeatures: [],

        timeline:
          requirement.deadline,

        assumptions: "",

        notes: "",

        status: "Draft",
      });

    res.status(201).json(scope);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};