import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();

  const admins = await User.find({ role: "admin" }).sort({ createdAt: -1 });

  return Response.json({ admins });
}

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) {
    return Response.json({ error: "Admin already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = await User.create({
    email,
    password: hashed,
    role: "admin",
  });

  return Response.json({ success: true, admin });
}
