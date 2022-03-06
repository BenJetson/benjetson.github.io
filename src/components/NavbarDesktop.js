import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const NavbarDesktop = ({ title, pages }) => {
  return (
    <>
      <Button
        component={Link}
        to="/"
        sx={{
          mr: 2,
          color: (theme) => theme.palette.primary.contrastText,
          textTransform: "none",
          fontSize: "larger",
          display: { xs: "none", md: "flex" },
        }}
      >
        {title}
      </Button>

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "flex-end",
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages.map((page) => (
          <Button
            component={Link}
            to={page.href}
            key={page.href}
            sx={{
              my: 2,
              color: (theme) => theme.palette.primary.contrastText,
              display: "block",
            }}
            activeStyle={{
              fontWeight: 700,
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textDecorationThickness: "1px",
              textUnderlineOffset: "0.25rem",
            }}
          >
            {page.label}
          </Button>
        ))}
      </Box>
    </>
  );
};
export default NavbarDesktop;
