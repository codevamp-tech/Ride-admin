import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function PUT(req, context) {
  const { id } = await context.params;
  await connectDB();

  const data = await req.json();
  const driver = await Driver.findByIdAndUpdate(id, data, { new: true });

  return Response.json({ success: true, driver });
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  await connectDB();

  await Driver.findByIdAndDelete(id);

  return Response.json({ success: true });
}
