import mongoose from "mongoose";
import logger from "./logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Successfully connected to MongoDB");
  } catch (error) {
    logger.error("DB connection error:", error);
    process.exit(1);
  }
};
