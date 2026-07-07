import mongoose from "mongoose";

const PromoUsageSchema = new mongoose.Schema(
  {
    promoId: { type: mongoose.Schema.Types.ObjectId, ref: "PromoCode", required: true },
    passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger", required: true },
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: "RideBooking", required: true },
    promoCode: { type: String, required: true },
    originalFare: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    finalFare: { type: Number, required: true },
    usedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.PromoUsage || mongoose.model("PromoUsage", PromoUsageSchema);
