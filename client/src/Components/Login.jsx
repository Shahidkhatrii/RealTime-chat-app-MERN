import React from "react";
import logo from "../../../icons/logo.png";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="img-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="login-box">
        <p className="login-text">Login to your Account</p>
        <TextField id="standard-basic" label="Username" variant="outlined" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          variant="outlined"
          onClick={() => {
            navigate("app/welcome");
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
