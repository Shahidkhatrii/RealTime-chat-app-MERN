import React, { useState } from "react";
import "../Styles/Components.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
const ChatArea = () => {
  const [conversations, setConversations] = useState([
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
  ]);
  var name = conversations[0].name;
  var timeStamp = conversations[0].timeStamp;
  return (
    <div className="chat-area-container">
      <div className="ca-header">
        <p className="con-icon">t</p>
        <div className="ca-header-content">
          <p className="con-title">{name}</p>
          <p className="con-timestamp">{timeStamp}</p>
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="ca-message-area">
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
      </div>
      <div className="ca-text-input">
        <input placeholder="Type a message" className="search-box" />
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
