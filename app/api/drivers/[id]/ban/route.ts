import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function PATCH(req, context) {
  const { id } = await context.params;
  await connectDB();

  const driver = await Driver.findById(id);
  const newStatus = driver.status === "Banned" ? "Active" : "Banned";

  await Driver.findByIdAndUpdate(
    id, 
    { status: newStatus }, 
    { new: true }
  );

  return Response.json({ success: true, status: newStatus });
}
