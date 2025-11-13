import mongoose from "mongoose";

const rideBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    pickupLocation: String,
    pickupLat: Number,
    pickupLng: Number,
    dropoffLocation: String,
    dropoffLat: Number,
    dropoffLng: Number,
    rideType: String,
    fare: Number,
    vehicleType: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "started", "completed", "cancelled", "onway"],
      default: "pending",
    },
    bookingTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.RideBooking ||
  mongoose.model("RideBooking", rideBookingSchema);
