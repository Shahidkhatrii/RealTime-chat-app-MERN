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
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#2",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#3",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
  ]);
  return (
    <div className="Sidebar-area">
      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleSharpIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <SearchIcon />
        <input className="search-box" placeholder="search" />
      </div>
      <div className="sb-conversations">
        {conversations.map((conversation) => {
          return <Conversations {...conversation} key={conversation.name} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
