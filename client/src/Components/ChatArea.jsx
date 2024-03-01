import React, { useEffect, useState } from "react";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import api from "../api/chatapi";
import { io } from "socket.io-client";
import { setRefresh } from "../Features/refreshSlice";
import Welcome from "./Welcome";
import { setNotifications, setSelectedChat } from "../Features/chatSlice";
import Toaster from "./Toaster";

const ENDPOINT = "https://realtime-chat-server-sgpt.onrender.com/";
var socket, selectedChatCompare;
function ChatArea() {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [groupExitStatus, setGroupExitStatus] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const selectedChat = useSelector((state) => state.chatSlice.selectedChat);
  const notifications = useSelector((state) => state.chatSlice.notifications);
  // const messagesEndRef = useRef(null);
  const refresh = useSelector((state) => state.refreshKey);
  const userData = JSON.parse(localStorage.getItem("UserData") || "");
  const navigate = useNavigate();
  if (!userData) {
    navigate("/");
  }
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setloaded] = useState(false);

  // Fetching messages
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

  // Sending messages
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

  // Exit from group
  const HandleGroupExit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };

      await api.put(
        "chat/groupExit",
        {
          chatId: selectedChat._id,
          userId: userData.data._id,
        },
        config
      );
      setGroupExitStatus({
        msg: `You have successfully left the group "${selectedChat.chatName}"`,
        key: Math.random(),
      });
      dispatch(setSelectedChat(null));
    } catch (error) {
      setGroupExitStatus({
        msg: `Something went wrong :/`,
        key: Math.random(),
      });
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
      navigate("/app/chat/welcome");
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
        dispatch(setNotifications([...notifications, newMessage]));
        console.log(newMessage, "new...");
      } else {
        const updatedMessages = [...allMessages, newMessage];
        setAllMessages(updatedMessages);
        dispatch(setRefresh(!refresh));
      }
    });
  });
  if (!selectedChat) {
    return (
      <>
        {groupExitStatus ? (
          <Toaster
            key={groupExitStatus.key}
            message={groupExitStatus.msg}
            type="success"
          />
        ) : (
          <></>
        )}
        <Welcome />
      </>
    );
  } else if (!loaded) {
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
    let conName;
    if (selectedChat.isGroupChat) {
      conName = selectedChat.chatName;
    } else {
      conName =
        selectedChat.users[0]._id === userData.data._id
          ? selectedChat.users[1]?.username
          : selectedChat.users[0].username;
    }
    return (
      <div className={"chat-area-container" + (lightTheme ? "" : " dark")}>
        <div className={"ca-header" + (lightTheme ? "" : " dark")}>
          <p className={"con-icon" + (lightTheme ? "" : " dark")}>
            {conName[0]}
          </p>
          <div className={"header-text" + (lightTheme ? "" : " dark")}>
            <p className={"con-title" + (lightTheme ? "" : " dark")}>
              {conName}
            </p>
          </div>
          {selectedChat.isGroupChat &&
          !(
            selectedChat.groupAdmin._id.toString() ===
            userData.data._id.toString()
          ) ? (
            <Tooltip TransitionComponent={Zoom} title="Exit Group" arrow>
              <IconButton onClick={HandleGroupExit}>
                <ExitToAppIcon
                  className={"icon" + (lightTheme ? "" : " dark")}
                />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
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
