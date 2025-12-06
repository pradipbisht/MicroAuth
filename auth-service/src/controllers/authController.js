import RefreshToken from "../models/refershTokenModel.js";
import logger from "../utils/logger.js";
import { validateRegistration, validateLogin } from "../utils/validation.js";
import { generateTokens } from "../utils/tokenUtils.js";
import User from "../models/authModel.js";

// Helper to set Cookie
const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true, // Prevents JS access (XSS protection)
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req, res, next) => {
  try {
    // 1. Validate
    const { error } = validateRegistration(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const { username, email, password } = req.body;

    // 2. Check Exists
    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });

    // 3. Create
    const user = await User.create({ username, email, password });

    // 4. Generate Tokens immediately (optional, auto-login after register)
    const { accessToken, refreshToken } = await generateTokens(user);

    // 5. Set Cookie
    setRefreshTokenCookie(res, refreshToken);

    logger.info(`User registered: ${user.email}`);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      accessToken, // Send Access Token in JSON
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // 1. Validate
    const { error } = validateLogin(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const { email, password } = req.body;

    // 2. Find User
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    // 3. Verify Password
    const isMatch = await user.verifyPassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    // 4. Generate Tokens
    const { accessToken, refreshToken } = await generateTokens(user);

    // 5. Set Cookie
    setRefreshTokenCookie(res, refreshToken);

    logger.info(`User logged in: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    next(error);
  }
};
