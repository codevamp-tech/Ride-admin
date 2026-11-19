import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = typeof body?.name === "string" ? body.name.trim().slice(0, 120) : "";
    const email = typeof body?.email === "string" ? body.email.trim().slice(0, 160) : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim().slice(0, 50) : "";
    const role = typeof body?.role === "string" ? body.role.trim().slice(0, 50) : "Passenger";
    const category = typeof body?.category === "string" ? body.category.trim().slice(0, 100) : "General Inquiry";
    const message = typeof body?.message === "string" ? body.message.trim().slice(0, 2000) : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields (Name, Email, and Message).",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    console.log("[Qubi Ride Support Inquiry Received]", {
      name,
      email,
      phone,
      role,
      category,
      message,
      submittedAt,
    });

    // Optional forward to backend server if configured
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
    if (backendUrl) {
      try {
        await fetch(`${backendUrl.replace(/\/$/, "")}/support/inquiry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, role, category, message, submittedAt }),
        });
      } catch (err) {
        console.warn("[Support Inquiry] Backend forwarding skipped:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for contacting Qubi Ride Support! Your inquiry has been received. Our team will review your message and respond within 24 hours.",
    });
  } catch (error) {
    console.error("[Support Inquiry API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while submitting your inquiry. Please email us directly at oscodesoftware@gmail.com.",
      },
      { status: 500 }
    );
  }
}
