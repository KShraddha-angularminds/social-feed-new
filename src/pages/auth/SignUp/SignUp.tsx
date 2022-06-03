import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import "./SignUp.scss";
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
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import LoadingButton from "@mui/lab/LoadingButton";

export default function SignUp() {
  // Initial hooks
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const theme = createTheme();
  const doRegister = (formData: any) => {
    console.log(formData);
    setButtonDisabled(true);
    authenticationService
      .register(formData)
      .then((response: any) => {
        setButtonDisabled(false);
        authenticationService.signInRoute();
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
  };
  const handleSignIn = () => {
    authenticationService.signInRoute();
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className="wrapper">
          <Card className="registerPage">
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
                <Typography
                  component="h1"
                  variant="h5"
                  className="register-title"
                  sx={{ fontWeight: "bold", marginLeft: "20%" }}
                >
                  Sign Up to Social Feed
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(doRegister)}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        autoComplete="firstname"
                        autoFocus
                        {...register("firstname")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        autoComplete="lastname"
                        {...register("lastname")}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
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
                    Sign Up
                  </LoadingButton>

                  <Box className="sign-up">
                    <Link
                      variant="body2"
                      style={{
                        color: "#637381",
                        fontSize: "16px",
                      }}
                      onClick={handleSignIn}
                    >
                      Already having an account?
                      <span style={{ color: "#1890FF" }}> Sign In</span>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
      </Container>
    </ThemeProvider>
  );
}
