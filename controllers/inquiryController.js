import ProjectInquiry from "../models/ProjectInquiry.js";

/**
 * CREATE NEW INQUIRY (PUBLIC)
 */
export const createInquiry = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      whatsapp,
      country,
      businessType,
      timeline,
      budget,
      description,
      service,
      packageName,
      packagePrice,
      startMethod,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !whatsapp ||
      !service
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const inquiry =
      await ProjectInquiry.create({
        fullName,
        companyName,
        email,
        whatsapp,
        country,
        businessType,
        timeline,
        budget,
        description,
        service,
        packageName,
        packagePrice,
        startMethod,
      });

    res.status(201).json({
      message:
        "Inquiry created successfully",
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Server error creating inquiry",
      error: error.message,
    });
  }
};

/**
 * GET ALL INQUIRIES
 */
export const getInquiries = async (
  req,
  res
) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (
      status &&
      status !== "all"
    ) {
      filter.status = status;
    }

    const inquiries =
      await ProjectInquiry.find(filter)
        .sort({ createdAt: -1 });

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch inquiries",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE INQUIRY
 */
export const getInquiryById =
  async (req, res) => {
    try {
      const inquiry =
        await ProjectInquiry.findById(
          req.params.id
        );

      if (!inquiry) {
        return res.status(404).json({
          message:
            "Inquiry not found",
        });
      }

      res.status(200).json(inquiry);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch inquiry",
        error: error.message,
      });
    }
  };

/**
 * UPDATE STATUS
 */
export const updateInquiryStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "new",
        "contacted",
        "proposal-sent",
        "in-progress",
        "completed",
        "closed",
        "rejected",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid status value",
        });
      }

      const inquiry =
        await ProjectInquiry.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      if (!inquiry) {
        return res.status(404).json({
          message:
            "Inquiry not found",
        });
      }

      res.status(200).json({
        message: "Status updated",
        inquiry,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update status",
        error: error.message,
      });
    }
  };

/**
 * DELETE INQUIRY
 */
export const deleteInquiry =
  async (req, res) => {
    try {
      const inquiry =
        await ProjectInquiry.findByIdAndDelete(
          req.params.id
        );

      if (!inquiry) {
        return res.status(404).json({
          message:
            "Inquiry not found",
        });
      }

      res.status(200).json({
        message:
          "Inquiry deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to delete inquiry",
        error: error.message,
      });
    }
  };

/**
 * STATS
 */
export const getInquiryStats =
  async (req, res) => {
    try {
      const total =
        await ProjectInquiry.countDocuments();

      const newCount =
        await ProjectInquiry.countDocuments({
          status: "new",
        });

      const inProgress =
        await ProjectInquiry.countDocuments({
          status: "in-progress",
        });

      const completed =
        await ProjectInquiry.countDocuments({
          status: "completed",
        });

      res.json({
        total,
        new: newCount,
        inProgress,
        completed,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch stats",
        error: error.message,
      });
    }
  };