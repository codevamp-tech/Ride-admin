import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PromoCode from "@/models/promoCode";

export async function GET() {
  try {
    await connectDB();
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });

    // Auto-expire codes past their expiry date
    const now = new Date();
    let updated = false;
    for (const promo of promoCodes) {
      if (promo.status === "Active" && promo.expiryDate && now > promo.expiryDate) {
        promo.status = "Inactive";
        await promo.save();
        updated = true;
      }
    }

    const final = updated ? await PromoCode.find().sort({ createdAt: -1 }) : promoCodes;
    return NextResponse.json(final);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch promo codes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Normalize code to uppercase
    if (body.code) body.code = body.code.toUpperCase().trim();

    const promo = await PromoCode.create(body);
    return NextResponse.json(promo, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Promo code already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create promo code" }, { status: 500 });
  }
}
