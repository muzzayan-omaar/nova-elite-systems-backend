import Handover from "../models/Handover.model.js";
import Agreement from "../models/Agreement.model.js";

export const createFromAgreement = async (req, res) => {
  try {
    const agreement = await Agreement.findById(req.params.id);

    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    const handover = await Handover.create({
      requirementId: agreement.requirementId,
      quotationId: agreement.quotationId,
      scopeId: agreement.scopeId,
      agreementId: agreement._id,

      handoverNumber: `NES-HO-${Date.now().toString().slice(-5)}`,

      clientName: agreement.clientName,
      company: agreement.company,
      email: agreement.email,

      projectTitle: agreement.projectTitle,
      projectType: agreement.projectType,

      deliveredItems: [
        "Website Deployment",
        "Admin Panel Access",
        "Source Code",
        "Documentation",
      ],

      liveUrl: "",
      repositoryUrl: "",
      adminPanelUrl: "",

      credentials: {
        hosting: "",
        email: "",
        database: "",
      },

      assets: [],

      checklist: [
        { task: "Final Testing Completed", done: true },
        { task: "Deployment Done", done: false },
        { task: "Client Approval Received", done: false },
      ],

      status: "Pending",

      notes: "",
    });

    res.status(201).json(handover);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHandover = async (req, res) => {
  try {
    const data = await Handover.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHandovers = async (req, res) => {
  try {
    const data = await Handover.find()
      .sort({ createdAt: -1 })
      .populate("agreementId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHandover = async (req, res) => {
  try {
    await Handover.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};