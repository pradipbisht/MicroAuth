import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn(`Access attempt without valid token format: ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: "Authentication required (Bearer token missing)",
      });
    }

    const token = authHeader.split(" ")[1];

    // CRITICAL FIX: Use JWT_ACCESS_SECRET to match your .env
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    // Distinguish between expired vs invalid
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";

    logger.warn(`Auth failed: ${message} - IP: ${req.ip}`);

    return res.status(401).json({
      success: false,
      message: message,
    });
  }
};
