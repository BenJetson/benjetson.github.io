import React from "react";

import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import Layout from "../components/Layout";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
