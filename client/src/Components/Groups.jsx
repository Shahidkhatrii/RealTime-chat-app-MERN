import React from "react";
import logo from "../../../icons/logo.png";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence, motion } from "framer-motion";
const Groups = () => {
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
          <IconButton className="icon">
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
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title" style={{ marginLeft: "10px" }}>
              Group#1
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Groups;
