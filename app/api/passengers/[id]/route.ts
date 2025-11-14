import { connectDB } from "@/lib/db";
import Passenger from "@/models/passenger";

export async function DELETE(req, context) {
  const { id } = await context.params;
  await connectDB();

  await Passenger.findByIdAndDelete(id);

  return Response.json({ success: true });
}