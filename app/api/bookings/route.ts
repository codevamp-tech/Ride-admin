import { connectDB } from "@/lib/db";
import RideBooking from "@/models/rideBooking";
import "@/models/passenger";
import "@/models/driver";

export async function GET() {
  await connectDB();

  const bookings = await RideBooking.find().sort({ createdAt: -1 });
    // .populate("userId")
    // .populate("driverId")
    

  return Response.json({ bookings });
}
