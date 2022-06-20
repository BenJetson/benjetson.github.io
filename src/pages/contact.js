import { Typography } from "@mui/material";
import ConstructionAlert from "../components/ConstructionAlert";
import Container from "../components/Container";

const ContactPage = () => (
  <Container sx={{ my: 2 }}>
    <Typography variant="h1">Contact</Typography>
    <ConstructionAlert />
  </Container>
);

export default ContactPage;
