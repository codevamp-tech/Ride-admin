import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function DELETE(req, context) {
  const params = await context.params;

  await connectDB();
  const user = await User.findByIdAndDelete(params.id);

  return Response.json({ success: true });
}
