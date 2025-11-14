import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function GET() {
  await connectDB();

  const drivers = await Driver.find().sort({ createdAt: -1 });

  return Response.json({ drivers });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const driver = await Driver.create(body);
  return Response.json({ success: true, driver });
}