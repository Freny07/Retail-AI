import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log("✅ MongoDB connected to Atlas");
  } catch (error) {
    console.error("❌ MongoDB Atlas connection failed:", error.message);
    console.log("🔌 Attempting connection to local MongoDB...");
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/gumasto", {
        serverSelectionTimeoutMS: 2000
      });
      console.log("✅ MongoDB connected to local instance");
    } catch (localError) {
      console.error("❌ Local MongoDB connection failed:", localError.message);
      console.log("⚠️ Server running in offline/no-database mode.");
    }
  }
};
