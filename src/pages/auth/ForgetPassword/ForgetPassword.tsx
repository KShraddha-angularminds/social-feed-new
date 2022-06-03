import React, { useState } from "react";
import "./ForgetPassword.scss";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";

function ForgetPassword() {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const theme = createTheme();
  const forgotPassHandler = (formData: any) => {
    console.log(formData);
    setButtonDisabled(true);
    authenticationService
      .forgetPassword(formData)
      .then((response: any) => {
        setButtonDisabled(false);
        // authenticationService.resetPasswordRoute();
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
  };
  const handleBack = () => {
    authenticationService.signInRoute();
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Card className="forgot-pass">
            <CardContent>
              <CssBaseline />
              <Box
                sx={
                  {
                    // marginTop: 8,
                    // display: "flex",
                    // flexDirection: "column",
                    // alignItems: "center",
                  }
                }
              >
                <Typography
                  component="h1"
                  variant="h5"
                  className="forgot-title"
                  sx={{ fontWeight: "bold" }}
                >
                  Forgot your password?
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(forgotPassHandler)}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Typography className="sub-title">
                    Please enter the email address associated with your account,
                    and we'll email you a link to reset your password.
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    {...register("email")}
                  />

                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="reset-pass-btn"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ fontWeight: "bold" }}
                    loading={isButtonDisabled}
                  >
                    Reset Password
                  </LoadingButton>
                  <Typography
                    variant="subtitle1"
                    className="back"
                    style={{ marginLeft: "45%" }}
                    align="center"
                    onClick={handleBack}
                  >
                    Back
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ForgetPassword;
