import React, { useEffect, useState } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../../icons/logo.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/chatapi";
import "../Styles/Components.css";
import { setRefresh } from "../Features/refreshSlice";

const CreateGroup = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const refresh = useSelector((state) => state.refreshKey);
  const userData = JSON.parse(localStorage.getItem("UserData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!userData) {
    navigate("/");
  }
  const user = userData.data;

  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createGroup = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const userArray = users;
    console.log(userArray, "users added to group");
    await api.post(
      "chat/createGroup",
      {
        name: groupName,
        users: userArray,
      },
      config
    );
    dispatch(setRefresh(!refresh));
    navigate("/app/groups");
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api.get("user/fetchUsers", config).then((response) => {
      setUsers(response.data);
    });
  }, [refresh]);

  return (
    <>
      <div className={"list-container" + (lightTheme ? "" : " dark")}>
        <div className={"ug-header" + (lightTheme ? "" : " dark")}>
          <img
            src={logo}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className={"ug-title" + (lightTheme ? "" : " dark")}>
            Create Group
          </p>
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => {
              dispatch(setRefresh(!refresh));
            }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <div className={"createGroup-box" + (lightTheme ? "" : " dark")}>
          <input
            placeholder="Enter Group Name"
            className={"search-box" + (lightTheme ? "" : " dark")}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => {
              handleClickOpen();
            }}
          >
            <DoneOutlineRoundedIcon />
          </IconButton>
        </div>

        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <SearchIcon />
          </IconButton>
          <input
            placeholder="Add members"
            className={"search-box" + (lightTheme ? "" : " dark")}
          />
        </div>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to create a Group Named " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will create a create group in which you will be the admin and
              other will be able to join this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                createGroup();
                handleClose();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CreateGroup;
