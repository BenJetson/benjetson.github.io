import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

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
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);

export default theme;
