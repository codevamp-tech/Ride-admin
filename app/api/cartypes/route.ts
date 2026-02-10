import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db"; 
import CarType from "@/models/carType";

export async function GET() {
  try {
    await connectDB();
    const carTypes = await CarType.find().sort({ createdAt: -1 });
    return NextResponse.json(carTypes);
  } catch (error) {
    console.error("Error fetching car types:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newCarType = await CarType.create(body);

    return NextResponse.json(newCarType, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create car type" },
      { status: 500 }
    );
  }
}
