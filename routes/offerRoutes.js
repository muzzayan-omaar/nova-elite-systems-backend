import express from "express";
import Offer from "../models/Offer.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const data = await Offer.find().sort({ createdAt: -1 });
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {
  const newOffer = new Offer(req.body);
  const saved = await newOffer.save();
  res.status(201).json(saved);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;