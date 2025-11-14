import { connectDB } from "@/lib/db";
import Passenger from "@/models/passenger";

export async function PATCH(req, context) {
  const { id } = await context.params;
  await connectDB();

  const passenger = await Passenger.findById(id);
  const newStatus = passenger.status === "Banned" ? "Active" : "Banned";

  passenger.status = newStatus;
  await passenger.save();

  return Response.json({ success: true, status: newStatus });
}
