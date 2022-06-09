import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./ChangePassword.scss";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { Container } from "@mui/system";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Menu from "@mui/material/Menu";
import { Snackbar } from "@mui/material";
import { baseURL } from "../../../utils/constants/urls";
import { authenticationService } from "../../../utils/auth.service";

import MuiAlert from "@mui/material/Alert";
import { AlertProps } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ChangePassword({ open, handleClose, handleNavClose }: any) {
  const { handleSubmit, register } = useForm();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const token = localStorage.getItem("token")!;
  const [errorMessage, setErrorMessage] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const doChangePassword = (formData: any) => {
    authenticationService
      .setPassword(formData, token, confirmPassword)
      .then((response: any) => {
        handleClose();
        handleNavClose();
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openProfile) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        // descriptionElement.focus();
      }
    }
  }, [openProfile]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  console.log(errorMessage);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title "
        aria-describedby="scroll-dialog-description"
      >
        <Container className="change-pass">
          <CloseOutlinedIcon className="cross" onClick={handleClose} />
          <DialogTitle id="scroll-dialog-title">
            Reset Your password
          </DialogTitle>

          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit(doChangePassword)}
              noValidate
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="currentPass"
                label="Current Password"
                autoComplete="currentPass"
                autoFocus
                // defaultValue={editForm.username}
                {...register("current_password")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="newPass"
                // defaultValue={editForm.email}
                label="New Password"
                autoComplete="newPass"
                {...register("new_password")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPass"
                // defaultValue={editForm.email}
                label="Confirm Password"
                autoComplete="confirmPass"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <LoadingButton
                type="submit"
                className="login-btn"
                fullWidth
                variant="contained"
                // loading={isButtonDisabled}
                style={{
                  background: "#1890FF",
                  borderRadius: "8px",
                  marginTop: "18px",
                }}
              >
                Reset Password
              </LoadingButton>
            </Box>
          </DialogContent>
        </Container>
      </Dialog>
      <Menu
        className="user-actions"
        id="basic-menu"
        anchorEl={anchorEl}
        open={openProfile}
        onClose={handleCloseProfile}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      ></Menu>

      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open2}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar> */}
    </div>
  );
}

export default ChangePassword;
