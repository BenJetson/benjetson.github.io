import { Typography } from "@mui/material";
import ConstructionAlert from "../components/ConstructionAlert";
import Container from "../components/Container";

const ResumePage = () => (
  <Container sx={{ my: 2 }}>
    <Typography variant="h1">Resumé</Typography>
    <ConstructionAlert />
  </Container>
);

export default ResumePage;
