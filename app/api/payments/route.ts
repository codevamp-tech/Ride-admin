import { connectDB } from "@/lib/db";
import Payment from "@/models/payment";
import Passenger from "@/models/passenger";
import RideBooking from "@/models/rideBooking";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const payments = await Payment.find({})
      .populate("passengerId", "fullName")
      .populate("rideId")
      .sort({ createdAt: -1 });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments", details: error },
      { status: 500 }
    );
  }
}
