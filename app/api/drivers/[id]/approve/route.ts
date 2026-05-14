import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function PATCH(req, context) {
  const { id } = await context.params;
  await connectDB();

  const newStatus = "Active";
  const driver = await Driver.findByIdAndUpdate(
    id, 
    { status: newStatus }, 
    { new: true }
  );

  return Response.json({ success: true, status: newStatus });
}