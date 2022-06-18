import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import Counter from "./Counter";

const MetaBox = ({ title, tagline }) => (
  <>
    <Typography variant="h3" component="h2">
      {title}
    </Typography>
    <Typography variant="body1" sx={{ my: 2 }}>
      {tagline}
    </Typography>
  </>
);

const SocialBox = () => {
  const socials = [
    {
      Name: "Twitter",
      Icon: <Twitter />,
      URL: "https://twitter.com/BenJetson",
    },
    {
      Name: "Instagram",
      Icon: <Instagram />,
      URL: "https://instagram.com/bfgodfr",
    },
    {
      Name: "LinkedIn",
      Icon: <LinkedIn />,
      URL: "https://linkedin.com/in/bfgodfrey",
    },
    {
      Name: "GitHub",
      Icon: <GitHub />,
      URL: "https://github.com/BenJetson",
    },
  ];

  return (
    <>
      <Typography variant="h4" component="h3">
        Follow Me!
      </Typography>
      <Box>
        {socials.map((social, idx) => (
          <IconButton
            aria-label={social.Name}
            href={social.URL}
            size="large"
            key={idx}
            sx={{ color: (theme) => theme.palette.blueGrey.contrastText }}
          >
            {social.Icon}
          </IconButton>
        ))}
      </Box>
    </>
  );
};

const CountBox = () => (
  <>
    <Typography variant="h4" component="h3">
      Pageviews
    </Typography>
    <Counter />
  </>
);

const CopyrightNotice = () => (
  <>
    <Typography variant="body1">
      &copy; {new Date().getFullYear()} Ben Godfrey. All rights reserved.
    </Typography>
    <Typography
      variant="body1"
      component="pre"
      sx={{
        fontFamily: "monospace",
        color: (theme) => theme.palette.pink.main,
      }}
    >
      build xxx-test
    </Typography>
  </>
);

const Footer = () => {
  const {
    site: {
      siteMetadata: { title, tagline },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          tagline
          title
        }
      }
    }
  `);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.blueGrey.main,
        color: (theme) => theme.palette.blueGrey.contrastText,
        minHeight: 300,
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MetaBox title={title} tagline={tagline} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SocialBox />
          </Grid>
          <Grid item xs={12} md={3}>
            <CountBox />
          </Grid>
        </Grid>
        <CopyrightNotice />
      </Container>
    </Box>
  );
};

export default Footer;
