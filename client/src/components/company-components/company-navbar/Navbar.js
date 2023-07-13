import React, {useContext, useEffect, useRef, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {mainNavbarItems} from "./consts/navbarItems";
import {Outlet, useNavigate} from "react-router-dom";
import Logo from "../../logo/Logo";
import {Avatar, Divider} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import CompanyDataContext from "../../../context/CompanyDataContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Logout} from "@mui/icons-material";
import {Drawer, DrawerHeader, AppBar, Content} from "./styles";

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const {denumire, logo} = useContext(CompanyDataContext);

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyName, setCompanyName] = useState(denumire || "");
  const [avatarImage, setAvatarImage] = useState(logo || null);

  useEffect(() => {
    setCompanyName(denumire || "");
    setAvatarImage(logo || null);
  }, [denumire, logo]);

  const handleMenuOpen = event => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("company-token");
    window.location.reload();
  };

  return (
    <Box sx={{display: "flex", height: "100vh"}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && {display: "none"}),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Logo single company sx={{width:40, height: 40}} />
              <Typography variant="h4" noWrap component="div">
                {companyName}
              </Typography>
              <Avatar
                sx={{width: 50, height: 50, marginRight: 2}}
                src={avatarImage}
                onClick={handleMenuOpen}
                ref={avatarRef}
              />
              <Menu
                anchorEl={avatarRef.current}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Delogare
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {mainNavbarItems.map((text, index) => (
            <ListItem
              key={text.id}
              disablePadding
              sx={{display: "block"}}
              onClick={() => navigate(text.route)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "primary.main",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.label}
                  sx={{opacity: open ? 1 : 0, color: "rgba(255, 255, 255)"}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Content open={open}>
        <DrawerHeader />
        <Outlet />
      </Content>
    </Box>
  );
}
