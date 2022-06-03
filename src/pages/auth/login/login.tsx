import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import GoogleLogin from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
import Divider from "@mui/material/Divider";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import LoadingButton from "@mui/lab/LoadingButton";

export default function Login() {
  // Initial hooks
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();

  const theme = createTheme();
  const googleData = {
    idToken: "",
    reCaptchaToken: "",
  };
  const reRef = useRef();
  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    console.log(formData);
    setButtonDisabled(true);
    authenticationService
      .verifyCredentials(formData)
      .then((response: any) => {
        setButtonDisabled(false);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
  };
  const handleForgetPass = () => {
    authenticationService.forgetPasswordRoute();
  };

  const handleSignUp = () => {
    authenticationService.signUpRoute();
  };

  const responseGoogle = async (response: any) => {
    console.log(reRef);
    // const token = await reRef.current.executeAsync();
    // googleData.reCaptchaToken = token;
    googleData.idToken = response.tokenId;
    authenticationService
      .googleLogin(googleData)
      .then((response: any) => {
        setButtonDisabled(false);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
    // axios
    //   .post("http://localhost:8000/users/auth/google", googleData, {
    //     headers: { Accept: "application/json" },
    //   })
    //   .then((response) => {
    //     localStorage.setItem("token", JSON.stringify(response));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    // });
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <ThemeProvider theme={theme}>
      {/* <Container component="main"> */}
      <div className="wrapper">
        <Card className="loginPage">
          <CardContent>
            <CssBaseline />
            <Box
              sx={
                {
                  // marginTop: 8,
                  // display: "flex",
                  // flexDirection: "column",
                  // alignItems: "center",
                  // padding: "32px 16px",
                  // gap: "32px",
                }
              }
            >
              <Typography component="h1" variant="h5" className="login-title">
                Sign in to Social Feed
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(doLogin)}
                noValidate
                sx={{ mt: 1 }}
              >
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <LoadingButton
                  type="submit"
                  className="login-btn"
                  fullWidth
                  variant="contained"
                  loading={isButtonDisabled}
                  style={{
                    background: "#1890FF",
                    borderRadius: "8px",
                    marginTop: "18px",
                  }}
                >
                  Sign In
                </LoadingButton>
                {/* <ReCAPTCHA
                  sitekey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5"
                  size="invisible"
                  ref={reRef}
                /> */}
                <Box className="forgot-pass">
                  <Link style={{ color: "#637381" }} onClick={handleForgetPass}>
                    Forgot password?
                  </Link>
                </Box>
                <Box className="sign-up">
                  <Link
                    variant="body2"
                    style={{
                      color: "#637381",
                      fontSize: "16px",
                    }}
                    onClick={handleSignUp}
                  >
                    Don't have an account?
                    <span style={{ color: "#1890FF" }}> Sign Up</span>
                  </Link>
                </Box>
                <Divider style={{ marginTop: "20px" }}>OR</Divider>
                <Grid item sx={{ textAlign: "center", marginTop: "15px" }}>
                  <GoogleLogin
                    clientId="692565184932-h9dv74rig6sccdqctvg7npbp5q8rrlj6.apps.googleusercontent.com"
                    buttonText="Log in with google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    style={{ color: "black" }}
                  />
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
      {/* </Container> */}
    </ThemeProvider>
  );
}
