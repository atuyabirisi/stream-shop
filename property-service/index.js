import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger.js";
import connectDB from "./propertyconfig/property.db.js";
import errorHandler from "./middleware/error.js";
import propertyHandler from "./routes/property.route.js";
import bookingHandler from "./routes/booking.route.js";
import mpesaRoutes from "./routes/mpesa.route.js";
import mongoose from "mongoose";
import mpesaHandler from "./routes/mpesa.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.ALTERNATE_PORT;

app.use(cors());
app.use(express.json());
app.use("/api/properties", propertyHandler);
app.use("/api/bookings/initiate", bookingHandler);
app.use("/api/mpesa", mpesaHandler);

app.use(errorHandler);

let server;

const startServer = async (retries = 5, delay = 5000) => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      const address = server.address();

      logger.info("Property service running at:", address);
    });

    server.on("error", (error) => {
      logger.error("Property service error:", error);

      shutdown("Server Error");
    });
  } catch (error) {
    if (retries === 0) {
      logger.error("All retries to connect to DB failed. Exiting...");

      shutdown("DB Connection Failure, Property service");
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

      logger.info("MongoDB connection closed. property service");

      process.exit(0);
    } catch (error) {
      logger.error("Error occurred while closing database connection:", error);

      process.exit(1);
    }
  });
};

process.on("SIGINT", () => shutdown("SIGINT signal received"));

process.on("SIGTERM", () => shutdown("SIGTERM signal received"));

startServer();
