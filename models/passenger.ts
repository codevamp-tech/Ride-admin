import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: String,
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["Active", "Banned"], default: "Active" },
});

export default mongoose.models.Passenger ||
  mongoose.model("Passenger", passengerSchema);
