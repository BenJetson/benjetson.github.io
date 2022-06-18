import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "gatsby";
import { useState } from "react";

const NavbarMobile = ({ title, pages }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setDrawerOpen(true)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Button
          component={Link}
          to="/"
          sx={{
            // flexGrow: 1,
            color: (theme) => theme.palette.primary.contrastText,
            textTransform: "none",
            fontSize: "larger",
            display: { xs: "flex", md: "none" },
          }}
        >
          {title}
        </Button>
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {pages.map((page, index) => (
              <ListItem component={Link} to={page.href} button key={page.href}>
                <ListItemText primary={page.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarMobile;
