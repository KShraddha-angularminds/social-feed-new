import React, { useState } from "react";
import "./ResetPassword.scss";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";

function ResetPassword() {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const theme = createTheme();
  const [cPass, setCPass] = useState("");

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let token = params.get("token");

  const resetPassHandler = (formData: any) => {
    console.log(formData);
    if (formData.password !== cPass) {
      alert("password confirm failed try again");
    } else {
      authenticationService
        .resetPassword(formData, token)
        .then((response: any) => {
          setButtonDisabled(false);
          authenticationService.signInRoute();
        })
        .catch((error) => {
          setButtonDisabled(false);
        });
    }
    setButtonDisabled(true);
  };

  const handleConfirmPass = (e: any) => {
    setCPass(e.target.value);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Card className="reset-pass">
            <CardContent>
              <CssBaseline />
              <Box>
                <Typography
                  component="h1"
                  className="reset-title"
                  style={{ fontWeight: "bold", marginLeft: "15%" }}
                  variant="h5"
                  align="center"
                >
                  Set your new password
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(resetPassHandler)}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm new password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onChange={(e) => handleConfirmPass(e)}
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={isButtonDisabled}
                  >
                    Reset Password
                  </LoadingButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ResetPassword;
