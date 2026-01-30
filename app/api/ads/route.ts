import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db"; 
import Ad from "@/models/ad";

export async function GET() {
  try {
    await connectDB();
    const ads = await Ad.find().sort({ createdAt: -1 });
    return NextResponse.json(ads);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch ads" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newAd = await Ad.create(body);

    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create ad" },
      { status: 500 }
    );
  }
}
