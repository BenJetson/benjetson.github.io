import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";

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

  return (
    <AppBar position="static" component="nav">
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
