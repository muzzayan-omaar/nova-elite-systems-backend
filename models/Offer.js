import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: String,
  discount: Number,
  expiresAt: Date,
}, { timestamps: true });

export default mongoose.model("Offer", offerSchema);