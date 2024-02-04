import React, { useEffect, useState } from "react";
import logo from "../../../icons/logo.png";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/chatapi";
import { setRefresh } from "../Features/refreshSlice";

const Groups = () => {
  // const { refresh, setRefresh } = useContext(myContext);
  const refresh = useSelector((state) => state.refreshKey);
  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const navigate = useNavigate();

  if (!userData) {
    navigate("/");
  }

  const user = userData.data;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    api.get("/chat/fetchGroup", config).then((response) => {
      setGroups(response.data);
      setLoaded(true);
    });
  }, []);

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
        <div className="ug-header">
          <img
            src={logo}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className="ug-title">Available Groups</p>
          <IconButton
            className="icon"
            onClick={() => {
              dispatch(setRefresh(!refresh));
            }}
          >
            <RefreshIcon />
          </IconButton>
        </div>

        <div className="sb-search">
          <IconButton className="icon">
            <SearchIcon />
          </IconButton>
          <input placeholder="Search" className="search-box" />
        </div>

        <div className="ug-list">
          {!loaded && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              Loading...
            </div>
          )}
          {loaded && groups.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              No groups available
            </div>
          )}
          {groups.map((group, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-tem" + (lightTheme ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Creating chat with group", group.chatName);
                  dispatch(refreshSidebarFun());
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>T</p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {group.chatName}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Groups;
