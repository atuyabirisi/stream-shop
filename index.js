import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./config/logger.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.ALTERNATE_PORT;

app.use(cors());
app.use(express.json());

let server;

const startServer = async (retries = 5, delay = 5000) => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      const address = server.address();

      logger.info("Server running at:", address);
    });

    server.on("error", (error) => {
      logger.error("Server error:", error);

      shutdown("Server Error");
    });
  } catch (error) {
    if (retries === 0) {
      logger.error("All retries to connect to DB failed. Exiting...");

      shutdown("DB Connection Failure");
    }

    logger.warn(`Retrying in ${delay / 1000}s...`);

    setTimeout(() => startServer(retries - 1, delay), delay);
  }
};

const shutdown = (signal) => {
  logger.info(`${signal} received. Server shutting down gracefully...`);

  if (!server) return;

  server.close(async () => {
    logger.info("Server closed.");

    try {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed.");

      process.exit(0);
    } catch (err) {
      logger.error("Error closing MongoDB:", err);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

app.use(errorHandler);

startServer();
