import amqp from "amqplib"; // Import is 'amqp'
import logger from "../utils/logger.js";

let channel = null;
const QUEUE_NAME = "bot_messages_queue";

// Use the local docker URL
const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    logger.info("🐰 Connected to RabbitMQ successfully");
    return channel;
  } catch (error) {
    logger.error("RabbitMQ connection failed", error);
  }
};

export const sendToQueue = async (data) => {
  if (!channel) {
    await connectRabbitMQ();
  }
  if (channel) {
    // Send data to queue (must be Buffer)
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), {
      persistent: true, // Save to disk
    });
  } else {
    logger.error(
      "RabbitMQ channel not available, message lost or fallback needed"
    );
  }
};
