import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PromoCode from "@/models/promoCode";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const promo = await PromoCode.findById(id);
    if (!promo) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(promo);
  } catch {
    return NextResponse.json({ error: "Failed to fetch promo code" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    if (body.code) body.code = body.code.toUpperCase().trim();

    const updated = await PromoCode.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Promo code already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update promo code" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await PromoCode.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete promo code" }, { status: 500 });
  }
}
