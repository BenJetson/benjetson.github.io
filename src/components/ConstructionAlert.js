import { Alert, AlertTitle } from "@mui/material";

const ConstructionAlert = () => (
  <Alert severity="warning">
    <AlertTitle>This page is a work in progress.</AlertTitle>
    The content of this page may not be accurate and will likely change in a
    future revision.
  </Alert>
);

export default ConstructionAlert;
