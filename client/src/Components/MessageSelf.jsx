import React from "react";

const MessageSelf = () => {
  var props = {
    name: "You",
    message: "This is a sample message",
  };
  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p className="con-lastmassege">{props.message}</p>
        <p className="self-timeStamp">12:45</p>
      </div>
    </div>
  );
};

export default MessageSelf;
