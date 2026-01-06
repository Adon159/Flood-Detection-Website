const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatRoomId: String,
    senderRole: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
