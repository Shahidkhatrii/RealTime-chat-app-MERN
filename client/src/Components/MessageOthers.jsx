import React from "react";
import { useSelector } from "react-redux";

const MessageOthers = ({ props }) => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={"others-message-container" + (lightTheme ? "" : " dark")}>
      <div className={"conversation-card" + (lightTheme ? "" : " dark")}>
        <p className={"con-icon" + (lightTheme ? "" : " lessdark")}>
          {props.sender.username[0]}
        </p>
        <div
          className={"other-text-content" + (lightTheme ? "" : " lessdark ")}
        >
          <p className={"con-title" + (lightTheme ? "" : " lessdark")}>
            {props.sender.username}
          </p>
          <p className={"con-lastmassege" + (lightTheme ? "" : " lessdark")}>
            {props.content}
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
