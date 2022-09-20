import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const contentSpacing = 3;

const theme = extendTheme(
  {
    colors: { primary: { main: "#01579b" } },
    sizes: {
      container: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    initialColorMode: "light",
    components: {
      Heading: { baseStyle: { my: contentSpacing } },
      Text: { baseStyle: { mb: contentSpacing } },
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);

export default theme;
