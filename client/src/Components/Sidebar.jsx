import React, { useState } from "react";
import "../Styles/Components.css";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import Conversations from "./Conversations";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";
import api from "../api/chatapi";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [conversations, setConversations] = useState([]);
  const userData = JSON.parse(localStorage.getItem("UserData") || "");
  console.log(userData.data.token, "userdata");
  const fetchConversation = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${userData.data.token}`,
        },
      };

      const response = await api.get("user/fetchUsers", config);
      console.log(response, "user list");
      setConversations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Sidebar-area">
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div onClick={fetchConversation}>
          <IconButton>
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
        {conversations.map((conversation) => {
          return (
            <Conversations {...conversation} key={conversation.username} />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
