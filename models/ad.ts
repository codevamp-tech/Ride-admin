import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: false },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Ad ||
  mongoose.model("Ad", AdSchema);
