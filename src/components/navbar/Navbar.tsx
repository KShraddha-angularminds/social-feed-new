import React, { useState } from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import EditProfile from "../../pages/EditProfile/EditProfile";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import { Avatar, Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  return (
    <AppBar
      position="static"
      className="navbar"
      style={{ background: "#ffffff" }}
    >
      <Box className="navbar-items">
        <div
          style={{
            display: "inline-flex",
            marginTop: "10px",
          }}
        >
          <Typography className="logo"></Typography>
          <Typography
            className="logoText"
            style={{
              marginLeft: "10px",
            }}
          >
            Life @ AM
          </Typography>
        </div>
        <div style={{ display: "inline-flex" }}>
          <HomeIcon className="icon" />
          <AddAPhotoOutlinedIcon className="icon" />
          <BookmarkBorderIcon className="icon" />
          <Avatar
            className="icon user-icon"
            style={{ height: "25px", width: "25px" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Typography className="icon user" style={{ marginTop: "15px" }}>
            User
          </Typography>
        </div>
      </Box>
      <Menu
        className="user-actions"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => setOpenEdit(!openEdit)}>
          <ManageAccountsOutlinedIcon className="model-icons" />
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LockResetOutlinedIcon className="model-icons" />
          Change Password
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <LogoutOutlinedIcon className="model-icons" />
          Logout
        </MenuItem>
      </Menu>
      {openEdit ? (
        <EditProfile open={openEdit} handleClose={handleEditClose} handleNavClose={handleClose}/>
      ) : (
        ""
      )}
    </AppBar>
  );
};
