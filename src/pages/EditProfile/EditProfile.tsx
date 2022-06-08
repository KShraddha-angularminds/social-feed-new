import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./EditProfile.scss";
import Avatar from "@mui/material/Avatar";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
import { Container } from "@mui/system";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { baseURL } from "../../utils/constants/urls";
import axios from "axios";
import { authenticationService } from "../../utils/auth.service";

function EditProfile({ open, handleClose, handleNavClose }: any) {
  const imagePath = "../../../nodejs-starter/src/assets/profileImage";

  const { handleSubmit, register } = useForm();
  const [value, setValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const [editForm, setEditForm] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [picture, setPicture] = useState("");
  const [mobile, setMobile] = useState(editForm.mobile || "");
  const doEditProfile = (formD: any) => {
    console.log(formD.image[0]);
    const formData = new FormData();
    formData.append("image", formD.image[0]);
    formData.append("username", formD.username);
    formData.append("bio", formD.bio);
    formData.append("DOB", formD.DOB);
    formData.append("mobile", formD.mobile);
    formData.append("email", formD.email);
    formData.append("gender", formD.gender);
    //console.log(picture, "picture");
    console.log(formData.get("image"));

    // console.log(formData);
    // formData.mobile = mobile;
    //setButtonDisabled(true);
    authenticationService
      .editProfile(formData)
      .then((response: any) => {
        handleClose();
        handleNavClose();
      })
      .catch((error) => {
        //setButtonDisabled(false);
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

  const handlePhone = () => {
    console.log("phone");
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    authenticationService.loadCurrentUser();
  }, []);

  console.log(editForm);
  console.log(picture.name);
  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        PaperProps={{
          sx: {
            width: "30%",
            height: "100%",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            // padding: "32px 16px",
            // gap: "32px",
          },
        }}
        scroll="body"
        aria-labelledby="scroll-dialog-title "
        aria-describedby="scroll-dialog-description"
      >
        <Container className="edit-profile" style={{ display: "flex" }}>
          <CloseOutlinedIcon
            className="model-icons"
            style={{ marginLeft: "400px" }}
            onClick={handleClose}
          />
          <DialogTitle id="scroll-dialog-title" className="title">
            Profile Update
          </DialogTitle>
          {/* <DialogContent dividers={scroll === "paper"}> */}

          <Avatar
            style={{ height: "100px", width: "100px" }}
            onClick={handleClick}
            src={`${baseURL}/${editForm.image}`}
          />

          <AddAPhotoIcon className="photo-icon" />

          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit(doEditProfile)}
              noValidate
              sx={{ mt: 0 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                autoFocus
                defaultValue={editForm.username}
                {...register("username")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                defaultValue={editForm.email}
                label="Email Address"
                autoComplete="email"
                {...register("email")}
              />
              <TextareaAutosize
                aria-label="minimum height"
                defaultValue={editForm.bio}
                minRows={6}
                placeholder="Enter Your bio here... "
                style={{ width: 400, borderRadius: "3px", marginTop: "15px" }}
                {...register("bio")}
              />
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="edit-items"
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={editForm.gender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    {...register("gender")}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    {...register("gender")}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    {...register("gender")}
                  />
                </RadioGroup>

                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="edit-items"
                >
                  Date Of Birth
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TextField
                    id="date"
                    type="date"
                    defaultValue={editForm.DOB}
                    {...register("DOB")}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="edit-items"
                >
                  Enter contact number
                </FormLabel>
                <MuiPhoneNumber
                  defaultCountry={"in"}
                  type="tel"
                  value={editForm.mobile}
                  onChange={(value) => setMobile(value)}
                  // value={value}
                  // {...register("mobile")}
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
      >
        <MenuItem>
          <input
            style={{
              color: "white",
              background: "white",
              height: "0px",
              width: "0px",
            }}
            // className="edit-update-photo"
            className="edir-add-photo-box"
            id="contained-button-file"
            multiple
            {...register("image")}
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
          />{" "}
          <label htmlFor="contained-button-file">
            <AddAPhotoOutlinedIcon className="model-icons" />
            Update photo
          </label>
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <DeleteOutlineOutlinedIcon className="model-icons" />
          Remove Photo
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseProfile}>
          <CloseOutlinedIcon className="model-icons" />
          Cancel
        </MenuItem>
      </Menu>
    </div>
  );
}

export default EditProfile;
