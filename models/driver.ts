import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  dateOfBirth: String,
  address: String,
  licenseNumber: { type: String, required: true },
  licenseExpiry: { type: String, required: true },
  licenseState: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  vehicleYear: { type: String, required: true },
  vehicleColor: { type: String, required: true },
  licensePlate: String,
  vehicleType: { type: String, required: true },
  accountHolderName: String,
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankName: String,
  password: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive","Pending Approval", "Banned", "Rejected"], default: "Pending Approval" },
});

export default mongoose.models.Driver ||
  mongoose.model("Driver", driverSchema);
