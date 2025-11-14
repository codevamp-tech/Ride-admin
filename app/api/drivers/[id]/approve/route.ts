import { connectDB } from "@/lib/db";
import Driver from "@/models/driver";

export async function PATCH(req, context) {
  const { id } = await context.params;
  await connectDB();
console.log("id", id)
  const driver = await Driver.findById(id);
  const newStatus = "Active";
  console.log("driverBefore", driver)
  driver.status = newStatus;
  console.log("driverAfter", driver)
  await driver.save();

  return Response.json({ success: true, status: newStatus });
}