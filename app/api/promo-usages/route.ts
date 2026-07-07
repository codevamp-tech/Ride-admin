import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PromoUsage from "@/models/promoUsage";
import "@/models/passenger";
import "@/models/rideBooking";
import "@/models/promoCode";

export async function GET() {
  try {
    await connectDB();
    const usages = await PromoUsage.find()
      .populate("passengerId", "fullName email phone")
      .populate("rideId", "pickup dropoff status")
      .sort({ createdAt: -1 });

    return NextResponse.json(usages);
  } catch (error) {
    console.error("Failed to fetch promo usages", error);
    return NextResponse.json({ error: "Failed to fetch promo usages" }, { status: 500 });
  }
}
