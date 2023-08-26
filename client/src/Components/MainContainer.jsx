import React, { useState } from "react";
import "../Styles/Components.css";
import Sidebar from "./Sidebar";

import "../Styles/Components.css";
import ChatArea from "./ChatArea";
import Welcome from "./Welcome";
import CreateGroup from "./CreateGroup";
const MainContainer = () => {
  const [conversations, setConversations] = useState([
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
    {
      name: "test#1",
      lastMassege: "last massege #1",
      timeStamp: "today",
    },
  ]);
  return (
    <>
      <div className="main-container">
        <Sidebar conversations={conversations} />
        <CreateGroup />
        {/* <Welcome /> */}
        {/* <ChatArea {...conversations[0]} /> */}
      </div>
    </>
  );
};

export default MainContainer;
