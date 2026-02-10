import { connectDB } from "@/lib/db";
import RideBooking from "@/models/rideBooking";
import "@/models/passenger";
import "@/models/driver";

export async function GET() {
  try {
    await connectDB();

    const bookings = await RideBooking.find().sort({ createdAt: -1 });
    // .populate("userId")
    // .populate("driverId")
    

    return Response.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return Response.json({ bookings: [] }, { status: 200 });
  }
}
