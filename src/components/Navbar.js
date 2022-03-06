import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "./Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resumé", href: "/resume" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  let appBarProps = { position: "static" };

  return (
    <AppBar {...appBarProps}>
      <Container>
        <Toolbar disableGutters>
          <NavbarDesktop title={title} pages={pages} />
          <NavbarMobile title={title} pages={pages} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
