import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SmartLink from "../components/SmartLink";

const makeTypographyVariant =
  (variant, parentProps = {}) =>
  ({ children, ...props }) =>
    (
      <Typography variant={variant} {...parentProps} {...props}>
        {children}
      </Typography>
    );

const makeWrappedTypographyVariant = (variant, wrapperElement) =>
  makeTypographyVariant(variant, { component: wrapperElement });

const BlockQuote = ({ children }) => (
  <Paper
    component="blockquote"
    sx={{
      p: 3,
      backgroundColor: `rgba(100, 100, 100, 0.15)`,
      borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
    }}
  >
    {children}
  </Paper>
);

const SimpleTable = ({ children }) => (
  <TableContainer
    component={Paper}
    sx={{ my: 2, backgroundColor: (theme) => theme.palette.grey[100] }}
  >
    <Table>{children}</Table>
  </TableContainer>
);

const SimpleCell = ({ children, ...props }) => {
  // For some reason, MDX passes props with align set to null. This causes MUI
  // to break because it expects a string. So, let's just unset if falsy.
  if (!props.align) delete props.align;

  return <TableCell {...props}>{children}</TableCell>;
};

export const mdxComponents = {
  h1: makeTypographyVariant("h1"),
  h2: makeTypographyVariant("h2"),
  h3: makeTypographyVariant("h3"),
  h4: makeTypographyVariant("h4"),
  h5: makeTypographyVariant("h5"),
  h6: makeTypographyVariant("h6"),
  p: makeTypographyVariant("body1"),
  li: makeWrappedTypographyVariant("body1", "li"),
  // ul: makeWrappedTypographyVariant("body1", "ul"),
  // ol: makeWrappedTypographyVariant("body1", "ol"),
  a: SmartLink,
  // pre: null,
  // code: null,
  // inlineCode: null,
  table: SimpleTable,
  thead: TableHead,
  tr: TableRow,
  // th: TableCell,
  // td: TableCell,
  th: SimpleCell,
  td: SimpleCell,

  blockquote: BlockQuote,
};
