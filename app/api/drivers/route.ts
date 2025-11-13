import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function GET() {
  await connectDB();

  const drivers = await Driver.find().sort({ createdAt: -1 });

  return Response.json({ drivers });
}
