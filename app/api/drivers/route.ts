import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function GET() {
  try {
    await connectDB();

    const drivers = await Driver.find().sort({ createdAt: -1 });

    return Response.json({ drivers });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ drivers: [] }, { status: 200 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const driver = await Driver.create(body);
    return Response.json({ success: true, driver });
  } catch (error) {
    console.error("Error creating driver:", error);
    return Response.json({ error: "Failed to create driver" }, { status: 500 });
  }
}