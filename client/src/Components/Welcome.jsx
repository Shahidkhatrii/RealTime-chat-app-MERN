import React from "react";
import logo from "../../../icons/logo.png";
const Welcome = () => {
  return (
    <div className="welcome-container">
      <img src={logo} alt="logo" className="welcom-logo" />
      <p>View and chat directly to people present in the chat Rooms.</p>
    </div>
  );
};

export default Welcome;
