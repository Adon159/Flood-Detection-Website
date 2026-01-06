const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {

    userId: String,
    userRole: {
      type: String,
      enum: ["victim", "volunteer", "donor"],
    },
    unreadForAdmin: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

chatRoomSchema.index({ userId: 1, userRole: 1 }, { unique: true });

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
