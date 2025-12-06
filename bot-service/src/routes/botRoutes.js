import express from "express";
import { BotCreate, deleteAllBotMessages } from "../botController.js";

const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("Bot route is working");
});

router.post("/bot-create", BotCreate);
router.delete("/delete-all", deleteAllBotMessages);

export default router;
