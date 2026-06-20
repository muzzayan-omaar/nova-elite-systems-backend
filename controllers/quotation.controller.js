import Quotation from "../models/Quotation.model.js";
import Requirement from "../models/Requirement.model.js";

export const createFromRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    const quotation = await Quotation.create({
      requirementId: requirement._id,

      clientName: requirement.clientName,
      company: requirement.company,
      email: requirement.email,

      projectTitle: requirement.projectTitle,
      projectType: requirement.projectType,

      scope: requirement.features?.join(", ") || "",
      timeline: requirement.deadline || "",

      paymentTerms: "50% upfront, 50% on completion",

      items: [
        {
          description: `${requirement.projectType} Development`,
          qty: 1,
          price: 0,
        },
      ],

      status: "Draft",
    });

    res.status(201).json(quotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE MANUAL QUOTATION
export const createQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);
    res.status(201).json(quotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuotations = async (req, res) => {
  try {
    const data = await Quotation.find()
      .sort({ createdAt: -1 })
      .populate("requirementId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuotation = async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};