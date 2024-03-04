import React from "react";

const NotAvailable = ({ display, padding = "20px" }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: padding,
        }}
      >
        {display}
      </div>
    </>
  );
};

export default NotAvailable;
