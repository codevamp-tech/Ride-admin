import { connectDB } from "@/lib/db";
import Passenger from "@/models/passenger";

export async function GET() {
  try {
    await connectDB();

    const passengers = await Passenger.find().sort({ createdAt: -1 });

    return Response.json({ passengers });
  } catch (error) {
    console.error("Error fetching passengers:", error);
    return Response.json({ passengers: [] }, { status: 200 });
  }
}
