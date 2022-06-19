import { Typography } from "@mui/material";
import ConstructionAlert from "../components/ConstructionAlert";
import Container from "../components/Container";

const AboutPage = () => (
  <Container sx={{ my: 2 }}>
    <Typography variant="h1">About</Typography>
    <ConstructionAlert />
  </Container>
);

export default AboutPage;
