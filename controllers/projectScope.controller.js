import ProjectScope from "../models/ProjectScope.model.js";
import Quotation from "../models/Quotation.model.js";

export const createFromQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    const scope = await ProjectScope.create({
      requirementId: quotation.requirementId,
      quotationId: quotation._id,

      clientName: quotation.clientName,
      company: quotation.company,
      email: quotation.email,

      scopeNumber: `NES-SCP-${Date.now().toString().slice(-5)}`,

      projectTitle: quotation.projectTitle,
      projectType: quotation.projectType,

      objectives: "To deliver a complete solution as agreed in quotation.",

      deliverables: [
        "UI/UX Design",
        "Frontend Development",
        "Backend API Integration",
        "Deployment",
      ],

      includedFeatures: quotation.scope
        ? quotation.scope.split(",")
        : [],

      excludedFeatures: [],

      timeline: quotation.timeline || "",

      assumptions:
        "Client will provide required assets and timely feedback.",

      notes: "",
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