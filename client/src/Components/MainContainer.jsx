import React from "react";
import "../Styles/Components.css";
import Sidebar from "./Sidebar";

import "../Styles/Components.css";

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const MainContainer = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <>
      <div className={"main-container" + (lightTheme ? "" : " dark-container")}>
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
