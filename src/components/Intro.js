import React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Paper, Typography } from "@mui/material";

const Intro = () => (
  <Box
    sx={{
      background: (theme) => `linear-gradient(
        ${theme.palette.primary.main},
        ${theme.palette.primary.light}
      )`,
      boxShadow: (theme) => `0 2px 2px 0px rgba(50,50,50,0.4)`,
      position: "relative",
      py: 2,
    }}
  >
    <Avatar
      alt="Ben Godfrey"
      src="https://github.com/BenJetson.png"
      sx={{
        width: 256,
        height: 256,
        mx: "auto",
        mb: 2,
      }}
    />
    <Typography
      variant="h1"
      sx={{
        textAlign: "center",
        color: (theme) => theme.palette.primary.contrastText,
        fontWeight: "500",
      }}
    >
      Hi! I'm Ben.
    </Typography>
  </Box>
);

export default Intro;
