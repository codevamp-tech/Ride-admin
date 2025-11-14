import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  const admin = await User.findOne({ email });

  if (!admin) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 });
  }

  return Response.json({
    success: true,
    user: { email: admin.email, role: admin.role },
  });
}
