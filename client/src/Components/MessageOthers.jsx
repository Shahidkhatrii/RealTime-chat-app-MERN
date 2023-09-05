import React from "react";
import { useSelector } from "react-redux";

const MessageOthers = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  var props = {
    name: "OtherUser",
    message: " This is a sample message",
  };
  return (
    <div className={"others-message-container" + (lightTheme ? "" : " dark")}>
      <div className={"conversation-card" + (lightTheme ? "" : " dark")}>
        <p className={"con-icon" + (lightTheme ? "" : " lessdark")}>
          {props.name[0]}
        </p>
        <div
          className={"other-text-content" + (lightTheme ? "" : " lessdark ")}
        >
          <p className={"con-title" + (lightTheme ? "" : " lessdark")}>
            {props.name}
          </p>
          <p className={"con-lastmassege" + (lightTheme ? "" : " lessdark")}>
            {props.message}
          </p>
          <p className={"self-timeStamp" + (lightTheme ? "" : " lessdark")}>
            12:05
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;
