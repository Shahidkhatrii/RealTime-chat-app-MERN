import React, { useEffect } from "react";
import "../Styles/Components.css";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";
import api from "../api/chatapi";
import { setChats, setSelectedChat } from "../Features/chatSlice";
import { setRefresh } from "../Features/refreshSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const selectedChat = useSelector((state) => state.chatSlice.selectedChat);
  const chats = useSelector((state) => state.chatSlice.chats);
  // const { refresh, setRefresh } = useContext(myContext);
  const refresh = useSelector((state) => state.refreshKey);
  const userData = JSON.parse(localStorage.getItem("UserData") || null);
  if (!userData) {
    navigate("/");
  }
  console.log(chats, "All chats");
  const user = userData.data;
  console.log(user);
  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };
    api.get("chat/", config).then(({ data }) => {
      dispatch(setChats(data));
    });
  }, [refresh, selectedChat]);
  const handleLogout = () => {
    localStorage.removeItem("UserData");
    navigate("/");
  };
  return (
    <div className="Sidebar-area">
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div>
          <IconButton
            onClick={() => {
              navigate("/app/welcome");
            }}
          >
            <AccountCircleSharpIcon
              className={"icon" + (lightTheme ? "" : " dark")}
            />
          </IconButton>
        </div>
        <div className="other-icons">
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {lightTheme && (
              <NightlightIcon
                className={"icon" + (lightTheme ? "" : " dark")}
              />
            )}
            {!lightTheme && (
              <LightModeIcon className={"icon" + (lightTheme ? "" : " dark")} />
            )}
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogoutIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
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
        {chats.map((chat, index) => {
          console.log(chat, "displaying chats...");
          const conReceiver =
            chat.users[0]._id === user._id ? chat.users[1] : chat.users[0];

          // if (conversation.users.length === 1) {
          //   return <div key={index}></div>;
          // } else {
          if (chat.users.length === 1) {
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
                    navigate(`chat/${conReceiver.username}`);
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {conReceiver.username[0]}
                  </p>
                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {conReceiver.username}
                  </p>

                  <p
                    className={"con-lastMessage" + (lightTheme ? "" : " dark")}
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
                  navigate(`chat/${conReceiver.username}`);
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  {conReceiver.username[0]}
                </p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {conReceiver.username}
                </p>

                <p className={"con-lastMessage" + (lightTheme ? "" : " dark")}>
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
