import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";
import { Link } from "gatsby";

const NavListItem = styled.li`
  list-style: none;
`;

const NavbarDesktop = ({ title, pages }) => {
  return (
    <>
      <Button
        component={Link}
        to="/"
        sx={{
          display: { xs: "none", md: "flex" },
          mr: 2,
          color: (theme) => theme.palette.primary.contrastText,
          textTransform: "none",
          fontSize: "larger",
        }}
      >
        {title}
      </Button>

      <Stack
        component="ul"
        direction="row"
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "end",
          flexGrow: 1,
          my: 0,
        }}
      >
        {pages.map((page) => (
          <NavListItem key={page.href}>
            <Button
              component={Link}
              to={page.href}
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                display: "flex",
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
          </NavListItem>
        ))}
      </Stack>
    </>
  );
};
export default NavbarDesktop;
