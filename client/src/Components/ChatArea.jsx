import React, { useState } from "react";
import "../Styles/Components.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";
const ChatArea = () => {
  const lightTheme = useSelector((state) => state.themeKey);
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
      <div className={"ca-header" + (lightTheme ? "" : " dark")}>
        <p className={"con-icon" + (lightTheme ? "" : " dark")}>t</p>
        <div className={"ca-header-content" + (lightTheme ? "" : " dark")}>
          <p className={"con-title" + (lightTheme ? "" : " dark")}>{name}</p>
          <p className={"con-timestamp" + (lightTheme ? "" : " dark")}>
            {timeStamp}
          </p>
        </div>
        <IconButton>
          <DeleteIcon className={"icon" + (lightTheme ? "" : " dark")} />
        </IconButton>
      </div>
      <div className={"ca-message-area" + (lightTheme ? "" : " dark")}>
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
      </div>
      <div className={"ca-text-input" + (lightTheme ? "" : " dark")}>
        <input
          placeholder="Type a message"
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
        <IconButton>
          <SendIcon className={"icon" + (lightTheme ? "" : " dark")} />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
