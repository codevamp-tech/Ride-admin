import mongoose from "mongoose";

const CarTypeSchema = new mongoose.Schema({
  type: { type: String, required: true},
  rate: { type: Number, required: true },
  baseFare: { type: Number, required: true, default: 0 },
  deviationCharge: { type: Number, required: true, default: 0 },
  airportCharge: { type: Number, required: true, default: 0 },
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
  peakHourStart: { type: String, required: false },
  peakHourEnd: { type: String, required: false },
  peakHourSurge: { type: Number, required: false },
  peakDays: { type: [String], required: false },
  peakDaySurge: { type: Number, required: false },
}, { timestamps: true });

export default mongoose.models.CarType ||
  mongoose.model("CarType", CarTypeSchema);