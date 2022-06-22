import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import { mdxComponents } from "./mdx";
import theme from "./theme";

// Originally, the theme was applied in wrapRootElement, but that seems to not
// work with hot reloading due to this bug:
// https://github.com/gatsbyjs/gatsby/issues/8237

export const wrapRootElement = ({ element }) => element;

export const wrapPageElement = ({ element, props }) => (
  <ThemeProvider theme={theme}>
    <MDXProvider components={mdxComponents}>
      <Layout {...props}>{element}</Layout>
    </MDXProvider>
  </ThemeProvider>
);
