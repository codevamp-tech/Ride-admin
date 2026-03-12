import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Ad from "@/models/ad";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = await params;

    const updatedAd = await Ad.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAd) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    return NextResponse.json(updatedAd);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update ad" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedAd = await Ad.findByIdAndDelete(id);

    if (!deletedAd) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ad deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete ad" },
      { status: 500 }
    );
  }
}
