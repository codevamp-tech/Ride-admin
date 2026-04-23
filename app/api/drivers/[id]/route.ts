import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function GET(req, context) {
  const { id } = await context.params;
  await connectDB();

  try {
    const driver = await Driver.findById(id);
    if (!driver) {
      return Response.json({ success: false, message: "Driver not found" }, { status: 404 });
    }
    return Response.json({ success: true, driver });
  } catch (error) {
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

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
