import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import Client from "../models/Client.js";
import protectAdmin
from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all
router.get("/", protectAdmin, async (req, res) => {
  const data = await Client.find();
  res.json(data);
});

// CREATE
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "nova-clients" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const newClient = new Client({
          name: req.body.name,
          logo: result.secure_url,
        });

        const saved = await newClient.save();
        res.status(201).json(saved);
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", protectAdmin, async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;