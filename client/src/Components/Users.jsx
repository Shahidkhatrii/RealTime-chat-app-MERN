import React, { useContext, useEffect, useState } from "react";
import logo from "../../../icons/logo.png";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import api from "../api/chatapi";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { myContext } from "./MainContainer";
import { useNavigate } from "react-router-dom";
import refreshSideBar from "../Features/refreshSideBar";
const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const { refresh, setRefresh } = useContext(myContext);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("UserData") || "");

  if (!userData) {
    console.log("Not authenticated user");
    navigate(-1);
  }
  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${userData.data.token}`,
      },
    };
    api.get("user/fetchUsers", config).then((response) => {
      setUsers(response.data);
      console.log("useEffect");
    });
  }, [refresh]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="list-container"
      >
        <div className={"ug-header" + (lightTheme ? "" : " dark")}>
          <img
            src={logo}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className={"ug-title" + (lightTheme ? "" : " dark")}>
            Available Users
          </p>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <RefreshIcon />
          </IconButton>
        </div>
        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
          <IconButton className="icon">
            <SearchIcon />
          </IconButton>
          <input
            placeholder="Search"
            className={"search-box" + (lightTheme ? "" : " dark")}
          />
        </div>
        <div className={"ug-list" + (lightTheme ? "" : " dark")}>
          {users.map((user) => {
            console.log(user);
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={"list-tem" + (lightTheme ? "" : " dark")}
                onClick={() => {
                  const config = {
                    headers: {
                      authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  api.post(
                    "chat/",
                    {
                      userId: user._id,
                    },
                    config
                  );
                  dispatch(refreshSideBar());
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  {user.username[0]}
                </p>
                <p
                  className={"con-title" + (lightTheme ? "" : " dark")}
                  style={{ marginLeft: "10px" }}
                >
                  {user.username}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Users;
