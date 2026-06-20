import Agreement from "../models/Agreement.model.js";
import ProjectScope from "../models/ProjectScope.model.js";

export const createFromScope = async (req, res) => {
  try {
    const scope = await ProjectScope.findById(req.params.id);

    if (!scope) {
      return res.status(404).json({ message: "Project scope not found" });
    }

    const agreement = await Agreement.create({
      requirementId: scope.requirementId,
      quotationId: scope.quotationId,
      scopeId: scope._id,

      agreementNumber: `NES-AGR-${Date.now().toString().slice(-5)}`,

      clientName: scope.clientName,
      company: scope.company,
      email: scope.email,

      projectTitle: scope.projectTitle,
      projectType: scope.projectType,

      terms:
        "This agreement confirms the scope, pricing, and delivery terms as mutually agreed.",

      paymentTerms: "50% upfront, 50% upon completion",

      startDate: new Date().toISOString().split("T")[0],
      deliveryDate: "",

      status: "Draft",

      notes: "",
    });

    res.status(201).json(agreement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAgreement = async (req, res) => {
  try {
    const agreement = await Agreement.create(req.body);
    res.status(201).json(agreement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAgreements = async (req, res) => {
  try {
    const data = await Agreement.find()
      .sort({ createdAt: -1 })
      .populate("scopeId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAgreement = async (req, res) => {
  try {
    await Agreement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};