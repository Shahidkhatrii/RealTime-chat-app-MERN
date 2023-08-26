import React from "react";

const MessageOthers = () => {
  var props = {
    name: "OtherUser",
    message: " This is a sample message",
  };
  return (
    <div className="others-message-container">
      <div className="conversation-card">
        <p className="con-icon">{props.name[0]}</p>
        <div className="other-text-content">
          <p className="con-title">{props.name}</p>
          <p className="con-lastmassege">{props.message}</p>
          <p className="self-timeStamp">12:05</p>
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;
