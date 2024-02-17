import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import api from "../api/chatapi";
import { io } from "socket.io-client";
import { setRefresh } from "../Features/refreshSlice";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
function ChatArea() {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const selectedChat = useSelector((state) => state.chatSlice.selectedChat);
  // const messagesEndRef = useRef(null);
  const refresh = useSelector((state) => state.refreshKey);
  const userData = JSON.parse(localStorage.getItem("UserData") || "");
  const navigate = useNavigate();
  if (!userData) {
    navigate("/");
  }
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setloaded] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    const { data } = await api.get("message/" + selectedChat?._id, config);
    setAllMessages(data);
    setloaded(true);
    socket.emit("join chat", selectedChat?._id);
  };

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };
      const { data } = await api.post(
        "message/",
        {
          content: messageContent,
          chatId: selectedChat?._id,
        },
        config
      );
      socket.emit("newMessage", data);
      setAllMessages([...allMessages, data]);
      dispatch(setRefresh(!refresh));
    } catch (error) {
      console.error(error?.message);
    }
  };
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // connect to socket
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
  }, []);

  //fetch chats
  useEffect(() => {
    if (!selectedChat || selectedChat === null) {
      navigate("/app/welcome");
    }
    fetchMessages();
    selectedChatCompare = selectedChat?._id;
    // scrollToBottom();
  }, [refresh, selectedChat, userData.data.token]);

  // new message received
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (!selectedChatCompare || selectedChatCompare !== newMessage.chat._id) {
        // notification logic will go here
      } else {
        const updatedMessages = [...allMessages, newMessage];
        setAllMessages(updatedMessages);
        dispatch(setRefresh(!refresh));
      }
    });
  });
  if (!loaded) {
    return (
      <div className="ca-skeleton">
        <Skeleton
          variant="rectangular"
          sx={{ width: "98%", borderRadius: "10px" }}
          height={60}
          className={lightTheme ? "" : "dark"}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "98%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
          className={lightTheme ? "" : "dark"}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "98%",
            borderRadius: "10px",
          }}
          height={60}
          className={lightTheme ? "" : "dark"}
        />
      </div>
    );
  } else {
    const chat_user =
      selectedChat?.users[0]._id === userData.data._id
        ? selectedChat?.users[1]
        : selectedChat?.users[0];
    return (
      <div className={"chat-area-container" + (lightTheme ? "" : " dark")}>
        <div className={"ca-header" + (lightTheme ? "" : " dark")}>
          <p className={"con-icon" + (lightTheme ? "" : " dark")}>
            {chat_user.username[0]}
          </p>
          <div className={"header-text" + (lightTheme ? "" : " dark")}>
            <p className={"con-title" + (lightTheme ? "" : " dark")}>
              {chat_user.username}
            </p>
            {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
              {props.timeStamp}
            </p> */}
          </div>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={"ca-message-area" + (lightTheme ? "" : " dark")}>
          {allMessages.length === 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              No previous Messages, start a new chat
            </div>
          )}
          {allMessages
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOthers props={message} key={index} />;
              }
            })}
        </div>
        {/* <div ref={messagesEndRef} className="BOTTOM" /> */}
        <div className={"ca-text-input" + (lightTheme ? "" : " dark")}>
          <input
            placeholder="Type a Message"
            className={"search-box" + (lightTheme ? "" : " dark")}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                sendMessage();
                setMessageContent("");
                dispatch(setRefresh(!refresh));
              }
            }}
          />
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => {
              sendMessage();
              setMessageContent("");
              dispatch(setRefresh(!refresh));
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChatArea;
