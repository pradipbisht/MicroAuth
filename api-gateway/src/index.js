import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { createProxyMiddleware } from "http-proxy-middleware";
import { validateToken } from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 8000;

// ==========================================
// 🛡️ FAIL-SAFE VARIABLES (The Fix)
// ==========================================
// We use the || operator. If process.env.VAR is missing, it uses the string on the right.
const AUTH_URL = process.env.AUTH_SERVICE_URL || "http://auth-service:5000";
const BOT_URL = process.env.BOT_SERVICE_URL || "http://bot-service:5003";
const PRODUCT_URL =
  process.env.PRODUCT_SERVICE_URL || "http://product-service:5001";

// Debug Log to prove it works
console.log("---------------------------------------");
console.log("🚀 GATEWAY CONFIGURATION:");
console.log(`- Auth Service Target: ${AUTH_URL}`);
console.log(`- Bot Service Target:  ${BOT_URL}`);
console.log("---------------------------------------");

// =======================
// GLOBAL MIDDLEWARE
// =======================
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// =======================
// PROXY ROUTES
// =======================

// 1. AUTH SERVICE
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: AUTH_URL, // <--- Using the variable we defined above
    changeOrigin: true,
    onError: (err, req, res) => {
      logger.error(`Auth Proxy Error: ${err.message}`);
      res.status(502).json({ message: "Auth Service Unavailable" });
    },
  })
);

// 2. BOT SERVICE
app.use(
  "/api/bot",
  createProxyMiddleware({
    target: BOT_URL, // <--- Using the variable we defined above
    changeOrigin: true,
    pathRewrite: {
      "^/api/bot": "", // Strip the prefix
    },
    onError: (err, req, res) => {
      logger.error(`Bot Proxy Error: ${err.message}`);
      res.status(502).json({ message: "Bot Service Unavailable" });
    },
  })
);

// 3. PRODUCT SERVICE
app.use(
  "/api/products",
  validateToken,
  createProxyMiddleware({
    target: PRODUCT_URL, // <--- Using the variable we defined above
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      if (req.user) {
        proxyReq.setHeader("x-user-id", req.user.userId);
        proxyReq.setHeader("x-user-name", req.user.username);
      }
    },
    onError: (err, req, res) => {
      logger.error(`Product Proxy Error: ${err.message}`);
      res.status(502).json({ message: "Product Service Unavailable" });
    },
  })
);

// =======================
// START SERVER
// =======================
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.json({
    status: "Gateway Running",
    config: { auth: AUTH_URL, bot: BOT_URL },
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 Gateway running on port ${PORT}`);
});
