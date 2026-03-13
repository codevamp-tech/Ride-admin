import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error);
    throw error;
  }
};
