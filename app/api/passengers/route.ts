import { connectDB } from "@/lib/db";
import Passenger from "@/models/passenger";

export async function GET() {
  await connectDB();

  const passengers = await Passenger.find().sort({ createdAt: -1 });

  return Response.json({ passengers });
}
