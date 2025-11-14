import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import CarType from "@/models/carType";

export async function PATCH(
  req: Request, context: any
) {
  try {
    const { id } = await context.params;
    await connectDB();
    const body = await req.json();
    const updated = await CarType.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Car type not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update car type" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context:any
) {
  try {
    const { id } = await context.params;
    await connectDB();
    const deleted = await CarType.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Car type not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete car type" },
      { status: 500 }
    );
  }
}
