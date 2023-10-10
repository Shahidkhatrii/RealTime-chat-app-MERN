const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Schema.types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timeStamp: true,
  }
);

const Message = mongoose.Model("Message", messageModel);
module.exports = Message;
