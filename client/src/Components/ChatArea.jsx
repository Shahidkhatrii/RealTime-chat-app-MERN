import React from "react";
import "../Styles/Components.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
const ChatArea = ({ name, timeStamp }) => {
  return (
    <div className="chat-area-container">
      <div className="ca-header">
        <p className="con-icon">{name[0]}</p>
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
