import React from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  return (
    <AppBar
      position="static"
      className="navbar"
      style={{ background: "#ffffff" }}
    >
      <Box sx={{ display: "inline-flex" }}>
        <Typography className="logo"></Typography>
        <Typography className="logoText">Life @ AM</Typography>
        <HomeIcon className="icon" />
        <AddAPhotoOutlinedIcon className="icon" />
        <BookmarkBorderIcon className="icon" />
        </Box>
      {/* <div className="titleBar"> */}

      {/* </div> */}

      {/* <Toolbar variant="dense">
        <IconButtonx
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButtonx>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          style={{ flex: 1 }}
        >
          MUI Template
        </Typography>
        <Tooltip title="Logout">
          <Button variant="text" style={{ color: "#fff" }} onClick={onLogout}>
            <Logout />
          </Button>
        </Tooltip>
      </Toolbar> */}
    </AppBar>
  );
};
