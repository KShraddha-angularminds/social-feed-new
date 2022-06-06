import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./EditProfile.scss";
import Avatar from "@mui/material/Avatar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiPhoneNumber from "material-ui-phone-number";
import { useForm } from "react-hook-form";

function EditProfile({ open, handleClose }) {
  //   const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const [value, setValue] = React.useState(null);

  //   const handleClickOpen = (scrollType) => () => {
  //     setOpen(true);
  //     setScroll(scrollType);
  //   };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        // descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "30%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            padding: "32px 16px",
            gap: "32px",
            // justifyContent: "space-evenly",
          },
        }}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title "
        aria-describedby="scroll-dialog-description"
      >
        <div>
          <DialogTitle id="scroll-dialog-title">Edit Profile</DialogTitle>
          {/* <DialogContent dividers={scroll === "paper"}> */}
          <Avatar
            style={{ height: "100px", width: "100px", marginLeft: "35%" }}
          />
          <DialogContent>
            <Box
              component="form"
              // onSubmit={handleSubmit(doLogin)}
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
                //   type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Minimum 3 rows"
                style={{ width: 400 }}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>

                <FormLabel id="demo-row-radio-buttons-group-label">
                  Date Of Birth
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <FormLabel id="demo-row-radio-buttons-group-label">
                  Enter contact number
                </FormLabel>
                <MuiPhoneNumber
                  defaultCountry={"in"}
                  variant="outlined"
                  type="tel"
                  margin="normal"
                  name="mobile"
                  //   value={editForm.mobile}
                  //   onChange={}
                  InputLabelProps={{ style: { fontSize: 18 } }}
                />
              </FormControl>

              <LoadingButton
                type="submit"
                className="login-btn"
                fullWidth
                variant="contained"
                //   loading={isButtonDisabled}
                style={{
                  background: "#1890FF",
                  borderRadius: "8px",
                  marginTop: "18px",
                }}
              >
                Save Profile
              </LoadingButton>
            </Box>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default EditProfile;
