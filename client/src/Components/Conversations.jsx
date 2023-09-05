import React from "react";
import "../Styles/Components.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Conversations = ({ name, lastMassege, timeStamp }) => {
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div
      className={"conversation-card" + (lightTheme ? "" : " dark")}
      onClick={() => {
        navigate("chat");
      }}
    >
      <p className={"con-icon" + (lightTheme ? "" : " dark")}>{name[0]}</p>
      <p className={"con-title" + (lightTheme ? "" : " dark")}>{name}</p>
      <p className={"con-lastmassege" + (lightTheme ? "" : " dark")}>
        {lastMassege}
      </p>
      <p className={"con-timestamp" + (lightTheme ? "" : " dark")}>
        {timeStamp}
      </p>
    </div>
  );
};

export default Conversations;
