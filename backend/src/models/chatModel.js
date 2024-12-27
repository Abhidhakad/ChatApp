import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v); // Ensure it's a valid image URL
        },
        message: "Invalid URL format for photo",
      },
    },
    chatName: {
      type: String,
      trim: true,
      maxlength: [30, "Chat Name can not be greater than 30 characters"],
      default: "Untitled Chat"
    },
    isGroup: {
      type: Boolean,
      default:false
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Users field cannot be empty"]
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  },
  { timestamps: true }
);

conversationSchema.pre("save", function (next) {
  if (this.isGroup && (!this.groupAdmin || this.groupAdmin.length === 0)) {
    return next(new Error("Group Admin is required for group conversations"));
  }
  if(this.groupAdmin.length > 3){
    return next(new Error("Group Admin can not set to more than 3"))
  }
  next();
});

export default mongoose.model("Chat", chatSchema);
