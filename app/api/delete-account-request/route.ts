import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const identifier = typeof body?.identifier === "string" ? body.identifier.trim().slice(0, 150) : "";
    const fullName = typeof body?.fullName === "string" ? body.fullName.trim().slice(0, 150) : "";
    const reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 1000) : "Not specified";

    if (!identifier || !fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Registered phone number or email address and full name are required.",
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    console.log("[Qubi Captain Account Deletion Request]", {
      app: "Qubi Captain (com.qubidriver)",
      identifier,
      fullName,
      reason,
      submittedAt,
    });

    // Forward to backend server if configured
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
    if (backendUrl) {
      try {
        await fetch(`${backendUrl.replace(/\/$/, "")}/delete-account/request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, fullName, reason }),
        });
      } catch (err) {
        console.warn("[Account Deletion] Backend forward skipped:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Your account deletion request has been received. Our support team will verify your details and complete deletion within 7 to 30 days.",
    });
  } catch (error) {
    console.error("[Account Deletion Request] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit deletion request. Please email oscodesoftware@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}
