import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true,"Sender is required"],
    index:true,
  },
  message: {
    type: String,
    trim: true,
    index:true,
    required: [true, "Message content cannot be empty"],
    maxlength: [500, "Message content cannot exceed 500 characters"],
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "Chat ID is required"],
  },
  attachments: [
    {
      fileUrl: {
        type: String,
        required: [true, "File URL is required for attachments"],
      },
      fileType: {
        type: String,
        enum: ["image", "video", "audio", "document"],
        required: [true, "File  type is required"],
      },
    },
  ],
  reactions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reacting is required"],
      },
      emoji: {
        type: String,
        required: [true, "Reaction emoji is required"],
      },
    },
  ],
  readBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reading the message is required"],
      },
      readAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},{timestamps:true});

messageSchema.pre("save", function (next) {
  if (!this.message || this.message.trim().length === 0) {
    return next(new Error("Message content cannot be empty"));
  }
  next();
});


export default mongoose.model("Message", messageSchema);
