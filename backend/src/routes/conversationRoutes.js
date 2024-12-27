import express from "express";
import {
  createConversation,
  getUserConversations,
} from "../controllers/conversationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createConversation);
router.get("/", protect, getUserConversations);

export default router;
