import ProjectScope from "../models/ProjectScope.model.js";
import Quotation from "../models/Quotation.model.js";
import Requirement from "../models/Requirement.model.js";

export const createFromQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    const scope =
  await ProjectScope.create({
    requirementId: requirement._id,

    clientName: requirement.clientName,
    company: requirement.company,
    email: requirement.email,

    scopeNumber: `NES-SCP-${Date.now()
      .toString()
      .slice(-5)}`,

    projectTitle: requirement.projectTitle,
    projectType: requirement.projectType,

    objectives: requirement.description,

    deliverables: [],

    includedFeatures: requirement.features || [],

    excludedFeatures: [],

    timeline: requirement.deadline || "",

    assumptions: "",

    notes: "",

    status: "Draft",
  });

    res.status(201).json(scope);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE MANUAL
export const createScope = async (req, res) => {
  try {
    const data = await ProjectScope.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScopes = async (req, res) => {
  try {
    const data = await ProjectScope.find()
      .sort({ createdAt: -1 })
      .populate("quotationId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteScope = async (req, res) => {
  try {
    await ProjectScope.findByIdAndDelete(req.params.id);
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
    console.log("Requirement ID:", req.params.id);

    const requirement =
      await Requirement.findById(
        req.params.id
      );

    console.log("Requirement:", requirement);

    if (!requirement) {
      return res.status(404).json({
        message: "Requirement not found",
      });
    }

    const scope =
      await ProjectScope.create({
        clientName: requirement.clientName,
        company: requirement.company,
        email: requirement.email,
        projectTitle: requirement.projectTitle,
        projectType: requirement.projectType,
        objectives: requirement.description,
        includedFeatures: requirement.features,
        timeline: requirement.deadline,
        status: "Draft",
      });

    console.log("Created Scope:", scope);

    res.status(201).json(scope);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};