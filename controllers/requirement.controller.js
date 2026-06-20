import Requirement from "../models/Requirement.model.js";

const safeNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

// CREATE
export const createRequirement = async (req, res) => {
  try {
    const {
      clientName,
      company,
      email,
      phone,
      projectTitle,
      projectType,
      budget,
      features,
      pages,
      referenceLinks,
      description,
      deadline,
      status,
      notes,
    } = req.body;

    const requirement = await Requirement.create({
      clientName,
      company,
      email,
      phone,
      projectTitle,
      projectType,
      budget: safeNumber(budget),

      // 🔥 FIX: normalize arrays safely
      features: Array.isArray(features)
        ? features
        : typeof features === "string"
        ? features.split(",").map((f) => f.trim())
        : [],

      pages: Array.isArray(pages)
        ? pages
        : typeof pages === "string"
        ? pages.split(",").map((p) => p.trim())
        : [],

      referenceLinks: Array.isArray(referenceLinks)
        ? referenceLinks
        : typeof referenceLinks === "string"
        ? referenceLinks.split(",").map((r) => r.trim())
        : [],

      description,
      deadline,
      status: status || "Pending",
      notes,
    });

    res.status(201).json(requirement);
  } catch (err) {
    console.error("CREATE REQUIREMENT ERROR:", err);
    res.status(500).json({ message: err.message });
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

