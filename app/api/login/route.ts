import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
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
  } catch (error) {
    console.error("Login API Error:", error);
    return Response.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}
