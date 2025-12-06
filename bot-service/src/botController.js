import { sendToQueue } from "./config/rabbitmq.js";
import botTrainingData, {
  badWords,
  fallbackResponse,
} from "./config/botDatabase.js";
import Bot from "./models/botModel.js";
import logger from "./utils/logger.js";

const getBotResponse = (userMessage) => {
  const input = userMessage.toLowerCase();

  for (let word of badWords) {
    if (input.includes(word)) {
      return "Please avoid using bad words.";
    }
  }

  for (let data of botTrainingData) {
    if (data.question.some((q) => input.includes(q))) {
      return data.answer;
    }
  }
  return fallbackResponse;
};

// ------------------------------------------------
//  FAST "Fire-and-Forget" Controller
// ------------------------------------------------
const BotCreate = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Text is required" });
    }

    // 1. Logic (Fast CPU task)
    const botResponse = getBotResponse(text);
    const normalizedResponse = botResponse
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // 2. Respond to User IMMEDIATELY
    res.status(200).json({
      success: true,
      message: "Message processed",
      botResponse: normalizedResponse,
    });

    // 3. Queue the DB Writes (Async)
    // We queue the user's message
    sendToQueue({
      text: text,
      author: "user_guest",
    }).catch((err) => logger.error("Queue error (User)", err));

    // We queue the bot's response
    sendToQueue({
      text: normalizedResponse,
      author: "bot",
    }).catch((err) => logger.error("Queue error (Bot)", err));
  } catch (error) {
    logger.error("Bot controller error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteAllBotMessages = async (req, res) => {
  try {
    await Bot.deleteMany({});
    res
      .status(200)
      .json({ success: true, message: "All bot messages deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { BotCreate, deleteAllBotMessages };
