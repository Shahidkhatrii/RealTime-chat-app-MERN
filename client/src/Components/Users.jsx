import React from "react";
import logo from "../../../icons/logo.png";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
const Users = () => {
  return (
    <div className="list-container">
      <div className="ug-header">
        <img
          src={logo}
          style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
        />
        <p className="ug-title">Available Users</p>
        <IconButton className="icon">
          <RefreshIcon />
        </IconButton>
      </div>
      <div className="sb-search">
        <IconButton className="icon">
          <SearchIcon />
        </IconButton>
        <input placeholder="Search" className="search-box" />
      </div>
      <div className="ug-list">
        <div className="list-tem">
          <p className="con-icon">T</p>
          <p className="con-title" style={{ marginLeft: "10px" }}>
            User#1
          </p>
        </div>
      </div>
    </div>
  );
};

export default Users;
