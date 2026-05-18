import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import CaseStudy from "../models/CaseStudy.js";
import protectAdmin
from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });


// ✅ GET all
router.get("/", protectAdmin, async (req, res) => {
  try {
    const data = await CaseStudy.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ CREATE with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      // Upload to Cloudinary
      const stream = cloudinary.uploader.upload_stream(
        { folder: "nova-case-studies" },
        async (error, result) => {
          if (error) return res.status(500).json({ error });

          const newItem = new CaseStudy({
            ...req.body,
            image: result.secure_url,
          });

          const saved = await newItem.save();
          res.status(201).json(saved);
        }
      );

      stream.end(req.file.buffer);

    } else {
      const newItem = new CaseStudy(req.body);
      const saved = await newItem.save();
      res.status(201).json(saved);
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ THIS LINE FIXES YOUR ERROR
export default router;