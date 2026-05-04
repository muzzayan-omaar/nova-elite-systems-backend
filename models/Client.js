import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  logo: String,
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);