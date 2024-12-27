import express from "express";
import {
  sendMessage,
  getConversationMessages,
} from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:conversationId", protect, getConversationMessages);

export default router;
