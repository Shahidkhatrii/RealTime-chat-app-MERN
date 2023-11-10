import React, { createContext, useState } from "react";
import "../Styles/Components.css";
import Sidebar from "./Sidebar";

import "../Styles/Components.css";

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const myContext = createContext();

const MainContainer = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  return (
    <>
      <div className={"main-container" + (lightTheme ? "" : " dark-container")}>
        <myContext.Provider value={{ refresh, setRefresh }}>
          <Sidebar />
          <Outlet />
        </myContext.Provider>
      </div>
    </>
  );
};

export default MainContainer;
