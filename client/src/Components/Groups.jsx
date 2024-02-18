import React, { useEffect, useState } from "react";
import logo from "../../../icons/logo.png";
import {
  Button,
  CircularProgress,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/chatapi";
import { setRefresh } from "../Features/refreshSlice";
const theme = createTheme({
  palette: {
    themeColor: {
      main: "#63d7b0",
      light: "#8ae5c7",
      dark: "#31d49e",
      contrastText: "#242105",
    },
  },
});
const Groups = () => {
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
            Available Groups
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

        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <SearchIcon />
          </IconButton>
          <input
            placeholder="Search"
            className={"search-box" + (lightTheme ? "" : " dark")}
          />
        </div>

        <div className={"ug-list" + (lightTheme ? "" : " dark")}>
          {!loaded && (
            <div className="progress-container">
              <CircularProgress color="inherit" />
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
                className={"list-tem" + (lightTheme ? "" : " dark")}
                key={index}
              >
                <div className="user-list-name">
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>T</p>
                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {group.chatName}
                  </p>
                </div>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="themeColor"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: "10px" }}
                    onClick={async () => {
                      const config = {
                        headers: {
                          authorization: `Bearer ${userData.data.token}`,
                        },
                      };
                      await api.post(
                        "chat/",
                        {
                          userId: group._id,
                        },
                        config
                      );
                      dispatch(setRefresh(!refresh));
                    }}
                  >
                    Add
                  </Button>
                </ThemeProvider>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Groups;
