import mongoose from "mongoose";

const CarTypeSchema = new mongoose.Schema({
  type: { type: String, required: true},
  rate: { type: Number, required: true },
  rideType: {
    type: String,
    enum: ["Private", "Sharing", "Airport"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.CarType ||
  mongoose.model("CarType", CarTypeSchema);