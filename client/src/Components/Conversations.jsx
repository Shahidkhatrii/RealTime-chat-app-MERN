import React from "react";
import "../Styles/Components.css";
import { useNavigate } from "react-router-dom";
const Conversations = ({ name, lastMassege, timeStamp }) => {
  const navigate = useNavigate();
  return (
    <div
      className="conversation-card"
      onClick={() => {
        navigate("chat");
      }}
    >
      <p className="con-icon">{name[0]}</p>
      <p className="con-title">{name}</p>
      <p className="con-lastmassege">{lastMassege}</p>
      <p className="con-timestamp">{timeStamp}</p>
    </div>
  );
};

export default Conversations;
