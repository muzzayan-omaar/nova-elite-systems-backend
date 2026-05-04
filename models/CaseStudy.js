import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: String,
  description: String,
  result: String,
  image: String, // Cloudinary URL later
}, { timestamps: true });

export default mongoose.model("CaseStudy", caseStudySchema);