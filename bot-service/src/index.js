import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import botRoutes from "./routes/botRoutes.js";
import { startBotWorker } from "./workers/botWorker.js";
import logger from "./utils/logger.js";
import { connectDb } from "./config/db.js";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 1. Connect DB
connectDb();

// 2. Start RabbitMQ Worker
startBotWorker();

// 3. Routes
app.use(botRoutes);

app.get("/health", (req, res) => {
  res.send("Bot Service is running");
});

app.listen(PORT, () => {
  logger.info(`🤖 Bot Service running on port ${PORT}`);
});
