import { connectRabbitMQ } from "../config/rabbitmq.js";
import Bot from "../models/botModel.js";
import logger from "../utils/logger.js";

const QUEUE_NAME = "bot_messages_queue";

export const startBotWorker = async () => {
  const channel = await connectRabbitMQ();

  if (!channel) {
    logger.warn("Worker skipped :RabbitMQ not connected");
    return;
  }

  logger.info("Bot Worker started.Waiting for messages...");

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      try {
        const content = JSON.parse(msg.content.toString());

        await Bot.create({
          text: content.text,
          author: content.author,
        });

        channel.ack(msg);
      } catch (error) {
        logger.warn("Worker failed to save message to DB", error);
      }
    }
  });
};
