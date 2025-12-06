// src/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser"; // Added
import rateLimit from "express-rate-limit"; // Added
import logger from "./utils/logger.js";
import AuthRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectDb } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Database Connection
connectDb();

// 2. Security Middleware
app.use(helmet());
app.use(cookieParser()); // Parse cookies

// CORS Configuration (Critical for Cookies)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
  })
);

// Rate Limiting (Prevent Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// 3. Safe Logging Middleware (Redact Passwords)
app.use((req, res, next) => {
  const safeBody = { ...req.body };
  if (safeBody.password) safeBody.password = "*****"; // Redact password

  logger.info(`${req.method} ${req.url}`, { body: safeBody });
  next();
});

// 4. Routes
app.use(AuthRoutes);

// 5. Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Identity service running on port ${PORT}`);
});

// Handle Crashes
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});
