import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true, // recommended for development
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error("MongoDB connection failed", err);
    process.exit(1);
  }
};
