import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, required: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, required: false, default: 0 },
    maxDiscountAmount: { type: Number, required: false },
    usageLimit: { type: Number, required: false },
    usedCount: { type: Number, default: 0 },
    expiryDate: { type: Date, required: false },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PromoCode ||
  mongoose.model("PromoCode", PromoCodeSchema);
