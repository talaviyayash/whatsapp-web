"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { Fragment, useState } from "react";

type navLinksTypes = {
  label: string;
  path: string;
};

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme(); // Get the theme

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const navLinks: navLinksTypes[] = [
    { label: "Signin", path: "/signin" },
    { label: "Signup", path: "/signup" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        // backgroundColor: "background.default", // Uses theme color
        backgroundColor: "black", // Uses theme color
        boxShadow: "none",
        borderBottom: "1px solid #333",
      }}
    >
      <Toolbar>
        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        >
          MyApp
        </Typography>

        {/* Drawer for Mobile */}
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        >
          <List sx={{ minWidth: 250 }}>
            {navLinks.map(({ label, path }, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <Link
                    href={path}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      color: theme.palette.text.primary,
                    }}
                  >
                    <ListItemText primary={label} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}>
          {navLinks.map(({ label, path }, index) => (
            <Fragment key={index}>
              <Link
                href={path}
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "all 0.3s",
                  background: "transparent",
                }}
              >
                {label}
              </Link>
            </Fragment>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
