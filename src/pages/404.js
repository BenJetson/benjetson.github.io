import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { Link } from "gatsby";

// markup
const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: (theme) => `linear-gradient(
          ${theme.palette.error.main},
          ${theme.palette.error.light}
        )`,
        py: 5,
        color: (theme) => theme.palette.error.contrastText,
        textAlign: "center",
        minHeight: "80vh",
      }}
    >
      <Container>
        <Typography
          variant="h1"
          sx={{ fontSize: "120px", fontFamily: "monospace" }}
        >
          404
        </Typography>
        <Typography variant="h2" sx={{ mb: 5 }}>
          Not Found
        </Typography>
        <Card sx={{ maxWidth: 800, mx: "auto", py: 3 }} raised>
          <CardContent>
            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
              That resource does not exist within this realm.
            </Typography>
            <Typography variant="body1">
              Try navigating again from the <Link to="/">homepage</Link>.
            </Typography>
            <Typography variant="body1">
              Is a link broken? Please{" "}
              <a href="https://github.com/BenJetson/benjetson.github.io/issues/new">
                file a ticket
              </a>{" "}
              to let me know.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
