import { List, Typography } from "@mui/material";

const makeTypographyVariant =
  (variant) =>
  ({ children, ...props }) =>
    (
      <Typography variant={variant} {...props}>
        {children}
      </Typography>
    );

export const mdxComponents = {
  h1: makeTypographyVariant("h1"),
  h2: makeTypographyVariant("h2"),
  h3: makeTypographyVariant("h3"),
  h4: makeTypographyVariant("h4"),
  h5: makeTypographyVariant("h5"),
  h6: makeTypographyVariant("h6"),
  p: makeTypographyVariant("body1"),
};
