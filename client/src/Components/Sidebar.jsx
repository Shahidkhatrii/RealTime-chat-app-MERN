import React, { useContext, useEffect, useState } from "react";
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
import Conversations from "./Conversations";
import { Navigate, json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";
import { refreshSidebarFun } from "../Features/refreshSideBar";
import api from "../api/chatapi";
import { myContext } from "./MainContainer";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [conversations, setConversations] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);

  const userData = JSON.parse(localStorage.getItem("UserData") || "");

  if (!userData) {
    navigate("/");
  }
  console.log(userData.data, "userdata");
  const user = userData.data;

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    navigate("/");
  };

  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };
    api.get("chat/", config).then((response) => {
      setConversations(response.data);
    });
  }, [refresh]);

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
        {conversations.map((conversation, index) => {
          console.log(conversation, "current convo");
          const conReceiver =
            conversation.users[0]._id === user._id
              ? conversation.users[1]
              : conversation.users[0];

          console.log(conReceiver, "conReciver");
          // if (conversation.users.length === 1) {
          //   return <div key={index}></div>;
          // } else {
          if (conversation.users.length === 1) {
            return <div key={index}></div>;
          }
          if (conversation.latestMessage === undefined) {
            // console.log("No Latest Message with ", conversation.users[1]);
            return (
              <div
                key={index}
                onClick={() => {
                  console.log("Refresh fired from sidebar");
                  // dispatch(refreshSidebarFun());
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    navigate(
                      "chat/" + conversation._id + "&" + conReceiver.username
                    );
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {conReceiver.username[0]}
                  </p>
                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {conReceiver.username}
                  </p>

                  <p className="con-lastMessage">
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
                className="conversation-container"
                onClick={() => {
                  navigate(
                    "chat/" + conversation._id + "&" + conReceiver.username
                  );
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  {conReceiver.username[0]}
                </p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {conReceiver.username}
                </p>

                <p className="con-lastMessage">
                  {conversation.latestMessage.content}
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
