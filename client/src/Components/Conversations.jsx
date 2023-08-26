import React from "react";
import "../Styles/Components.css";
const Conversations = ({ name, lastMassege, timeStamp }) => {
  return (
    <div className="conversation-card">
      <p className="con-icon">{name[0]}</p>
      <p className="con-title">{name}</p>
      <p className="con-lastmassege">{lastMassege}</p>
      <p className="con-timestamp">{timeStamp}</p>
    </div>
  );
};

export default Conversations;
