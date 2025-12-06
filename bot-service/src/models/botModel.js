import mongoose from "mongoose";

// Schema for bot messages
const BotSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // Text is required
  },
  author: {
    type: String,
    required: true, // Author is required
    trim: true, // Remove extra spaces
    lowercase: true, // Convert to lowercase
  },
  date: {
    type: Date,
    default: Date.now, // Default to current date
  },
});

// Create and export the Bot model
const Bot = mongoose.model("Bot", BotSchema);

export default Bot;
