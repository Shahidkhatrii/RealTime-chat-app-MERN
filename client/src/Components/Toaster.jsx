import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export default function Toaster({ message, type = "error" }) {
  console.log(type);
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        severity={type === "error" ? "warning" : "success"}
        variant={type === "error" ? "warning" : "success"}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={message}
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <Alert
          onClose={handleClose}
          severity={type === "error" ? "warning" : "success"}
          sx={{ width: "30vw" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
