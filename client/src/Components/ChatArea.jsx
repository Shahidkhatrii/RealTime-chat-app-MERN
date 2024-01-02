import React, { useContext, useRef, useState } from "react";
import "../Styles/Components.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myContext } from "./MainContainer";
const ChatArea = () => {
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messageEndRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("UserData") || "");
  const [allMessages, setAllMessages] = useState([]);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setLoaded] = useState();
  if (!userData) {
    navigate("/");
  }
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
