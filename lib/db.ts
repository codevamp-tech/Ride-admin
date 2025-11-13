import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error);
  }
};
