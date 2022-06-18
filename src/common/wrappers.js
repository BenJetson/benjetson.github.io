import { ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import theme from "./theme";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
