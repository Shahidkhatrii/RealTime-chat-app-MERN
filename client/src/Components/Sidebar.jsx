import React, { useEffect, useState } from "react";
import "../Styles/Components.css";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Zoom,
  useMediaQuery,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";
import api from "../api/chatapi";
import { setChats, setSelectedChat } from "../Features/chatSlice";
import { setRefresh } from "../Features/refreshSlice";
const Sidebar = () => {
  const matches = useMediaQuery("(min-width:40em)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const selectedChat = useSelector((state) => state.chatSlice.selectedChat);
  const chats = useSelector((state) => state.chatSlice.chats);
  const refresh = useSelector((state) => state.refreshKey);
  const userData = JSON.parse(localStorage.getItem("UserData") || null);
  const [loaded, setLoaded] = useState(false);
  if (!userData) {
    navigate("/");
  }
  const user = userData.data;

  useEffect(() => {
    const fetchChat = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };
      await api.get("chat/", config).then(({ data }) => {
        dispatch(setChats(data));
      });
      setLoaded(true);
    };
    if (matches) {
      fetchChat();
    }
  }, [refresh, selectedChat, matches]);
  const handleLogout = () => {
    localStorage.removeItem("UserData");
    navigate("/");
  };
  return (
    <div className="Sidebar-area">
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div>
          <Tooltip TransitionComponent={Zoom} title="Profile" arrow>
            <IconButton
              onClick={() => {
                navigate("/app/welcome");
              }}
            >
              <AccountCircleSharpIcon
                className={"icon" + (lightTheme ? "" : " dark")}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className="other-icons">
          <div className="forMobile">
            <Tooltip TransitionComponent={Zoom} title="Profile" arrow>
              <IconButton
                onClick={() => {
                  navigate("/app/");
                }}
              >
                <ChatIcon className={"icon" + (lightTheme ? "" : " dark")} />
              </IconButton>
            </Tooltip>
          </div>

          <Tooltip TransitionComponent={Zoom} title="Users" arrow>
            <IconButton
              onClick={() => {
                navigate("users");
              }}
            >
              <PersonAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Groups" arrow>
            <IconButton
              onClick={() => {
                navigate("groups");
              }}
            >
              <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Create group" arrow>
            <IconButton
              onClick={() => {
                navigate("create-groups");
              }}
            >
              <AddCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Theme" arrow>
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {lightTheme && (
                <NightlightIcon
                  className={"icon" + (lightTheme ? "" : " dark")}
                />
              )}
              {!lightTheme && (
                <LightModeIcon
                  className={"icon" + (lightTheme ? "" : " dark")}
                />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Logout" arrow>
            <IconButton onClick={handleLogout}>
              <LogoutIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className={"sb-search" + (lightTheme ? "" : " dark")}>
        <IconButton>
          <SearchIcon className={"icon" + (lightTheme ? "" : " dark")} />
        </IconButton>

        <input
          placeholder="search"
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
      </div>
      <div className={"sb-conversations" + (lightTheme ? "" : " dark")}>
        {!loaded && (
          <div className="progress-container">
            <CircularProgress color="inherit" />
          </div>
        )}
        {loaded && chats.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            No previous chats, go to available users and click on user to start
            chat.
          </div>
        )}
        {loaded &&
          chats.map((chat, index) => {
            let conName;
            if (chat.isGroupChat) {
              conName = chat.chatName;
            } else {
              conName =
                chat.users[0]._id === user._id
                  ? chat.users[1]?.username
                  : chat.users[0].username;
            }
            if (chat.users.length === 1) {
              // if (conversation.users.length === 1) {
              //   return <div key={index}></div>;
              // } else {
              return <div key={index}></div>;
            }
            if (chat.latestMessage === undefined) {
              return (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(setRefresh(!refresh));
                  }}
                >
                  <div
                    key={index}
                    className={
                      "conversation-container" + (lightTheme ? "" : " dark")
                    }
                    onClick={() => {
                      dispatch(setSelectedChat(chat));
                      navigate(`chat/${conName}`);
                    }}
                    // dispatch change to refresh so as to update chatArea
                  >
                    <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                      {conName[0]}
                    </p>
                    <p className={"con-title" + (lightTheme ? "" : " dark")}>
                      {conName}
                    </p>

                    <p
                      className={
                        "con-lastMessage" + (lightTheme ? "" : " dark")
                      }
                    >
                      No previous Messages, click here to start a new chat
                    </p>
                    {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                  {conversation.timeStamp}
                </p> */}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={
                    "conversation-container" + (lightTheme ? "" : " dark")
                  }
                  onClick={() => {
                    dispatch(setSelectedChat(chat));
                    navigate(`chat/${conName}`);
                  }}
                >
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {conName[0]}
                  </p>
                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {conName}
                  </p>

                  <p
                    className={"con-lastMessage" + (lightTheme ? "" : " dark")}
                  >
                    {chat.latestMessage.content}
                  </p>
                  {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                  {conversation.timeStamp}
                </p> */}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Sidebar;
