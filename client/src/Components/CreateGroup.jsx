import { IconButton } from "@mui/material";
import React from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
const CreateGroup = () => {
  return (
    <div className="createGroup-container">
      <div className="createGroup-box">
        <input placeholder="Enter Group Name" className="search-box" />
        <IconButton>
          <DoneOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CreateGroup;
