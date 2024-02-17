import React, { useEffect, useState } from "react";
import logo from "../../../icons/logo.png";
import {
  Button,
  CircularProgress,
  IconButton,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/chatapi";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRefresh } from "../Features/refreshSlice";
import { createTheme } from "@mui/material/styles";

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

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);

  const refresh = useSelector((state) => state.refreshKey);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("UserData") || "");
  const [loaded, setLoaded] = useState(false);
  if (!userData) {
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
            Available Users
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
          <IconButton className="icon">
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
          {loaded && users.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              No users available
            </div>
          )}
          {loaded &&
            users.map((user) => {
              return (
                <motion.div
                  className={"list-tem" + (lightTheme ? "" : " dark")}
                  key={user._id}
                >
                  <div
                    className={"user-list-name" + (lightTheme ? "" : " dark")}
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
                            userId: user._id,
                          },
                          config
                        );
                        dispatch(setRefresh(!refresh));
                      }}
                    >
                      Add
                    </Button>
                  </ThemeProvider>

                  {/* <Tooltip title="Add">
                    <IconButton
                      className={"icon" + (lightTheme ? "" : " dark")}
                      onClick={async () => {
                        const config = {
                          headers: {
                            authorization: `Bearer ${userData.data.token}`,
                          },
                        };
                        await api.post(
                          "chat/",
                          {
                            userId: user._id,
                          },
                          config
                        );
                        dispatch(setRefresh(!refresh));
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip> */}
                </motion.div>
              );
            })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Users;
