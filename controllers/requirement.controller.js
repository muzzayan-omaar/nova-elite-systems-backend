import Requirement from "../models/Requirement.model.js";


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

