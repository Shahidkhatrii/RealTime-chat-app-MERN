import React from "react";

const MessageSelf = ({ props }) => {
  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p className="con-lastmassege" style={{ color: "black" }}>
          {props.content}
        </p>
        <p className="self-timeStamp">12:45</p>
      </div>
    </div>
  );
};

export default MessageSelf;
