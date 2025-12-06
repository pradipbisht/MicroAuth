import jwt from "jsonwebtoken";
import crypto from "crypto";
import RefreshToken from "../models/refershTokenModel.js";

export const generateTokens = async (user) => {
  // 1. Create Access Token
  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );

  // 2. Generate Refresh Token (random string)
  const refreshToken = crypto.randomBytes(40).toString("hex");

  // 3. Save Refresh Token to DB
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expiresAt,
  });

  return {
    accessToken,
    refreshToken,
  };
};
