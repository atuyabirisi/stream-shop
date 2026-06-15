import mongoose from "mongoose";
import logger from "../../config/logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("Successfully connected to MongoDB");
  } catch (error) {
    logger.error("DB connection error:", error);

    process.exit(1);
  }
};

export default connectDB;
