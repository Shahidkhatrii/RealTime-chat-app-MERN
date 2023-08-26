import React from "react";
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
const Sidebar = ({ conversations }) => {
  return (
    <div className="Sidebar-area">
      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleSharpIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
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
          return <Conversations {...conversation} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
