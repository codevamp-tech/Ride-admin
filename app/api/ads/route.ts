import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db"; 
import Ad from "@/models/ad";

export async function GET() {
  try {
    await connectDB();
    const ads = await Ad.find().sort({ createdAt: -1 });

    const now = new Date();
    let updated = false;

    // Check expiration and update if needed
    for (const ad of ads) {
      if (ad.status === 'Active' && ad.duration) {
        const expirationDate = new Date(ad.createdAt);
        expirationDate.setDate(expirationDate.getDate() + ad.duration);
        if (now > expirationDate) {
          ad.status = 'Inactive';
          await ad.save();
          updated = true;
        }
      }
    }

    const finalAds = updated ? await Ad.find().sort({ createdAt: -1 }) : ads;

    return NextResponse.json(finalAds);
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
