import React from "react";
import "../Styles/Components.css";
import Sidebar from "./Sidebar";

import "../Styles/Components.css";
import ChatArea from "./ChatArea";
import Welcome from "./Welcome";
import CreateGroup from "./CreateGroup";
import Groups from "./Groups";
import Users from "./Users";
import { Outlet } from "react-router-dom";
const MainContainer = () => {
  return (
    <>
      <div className="main-container">
        <Sidebar />
        <Outlet />
        {/* <Users /> */}
        {/* <Groups /> */}
        {/* <CreateGroup /> */}
        {/* <Welcome /> */}
        {/* <ChatArea {...conversations[0]} /> */}
      </div>
    </>
  );
};

export default MainContainer;
