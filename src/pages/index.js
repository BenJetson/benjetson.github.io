import React from "react";
import Intro from "../components/Intro";
import Layout from "../components/Layout";
import Container from "../components/Container";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useStaticQuery, graphql } from "gatsby";

const MoreButton = ({ moreOf, to }) => (
  <Button
    variant="outlined"
    color="info"
    component={Link}
    sx={{ mt: 2 }}
    to={to}
  >
    More {moreOf}
  </Button>
);

const AboutSnippet = () => (
  <Box
    component="section"
    sx={{
      backgroundColor: (theme) => theme.palette.grey[200],
      py: 3,
    }}
  >
    <Container>
      <Typography variant="body1">
        I'm a technology enthusiast with a passion for code. I code for work,
        school, and just for fun.
      </Typography>
      <MoreButton moreOf="About Me" to="/about" />
    </Container>
  </Box>
);

const RecentPosts = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <Box sx={{ py: 3 }}>
      <Container>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Recent Posts
        </Typography>
        <Stack direction="row" spacing={2}>
          {[1, 2, 3].map((val, idx) => (
            <Card key={idx}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  Post # {val}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a snippet of post {val}.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <MoreButton moreOf="Posts" to="/blog" />
      </Container>
    </Box>
  );
};

const FeaturedProjects = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <Box sx={{ py: 3 }}>
      <Container>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Featured Projects
        </Typography>
        <Stack direction="row" spacing={2}>
          {[1, 2, 3].map((val, idx) => (
            <Card key={idx}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  Project {val}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This describes the Project {val}.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <MoreButton moreOf="Projects" to="/projects" />
      </Container>
    </Box>
  );
};

const IndexPage = () => (
  <>
    <Intro />
    <AboutSnippet />
    <RecentPosts />
    <FeaturedProjects />
  </>
);

export default IndexPage;
