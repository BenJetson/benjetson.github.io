import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const contentSpacing = 3;

/**
 * @typedef {import('@chakra-ui/react').ThemeOverride} ThemeOverride
 * @type {ThemeOverride}
 */
const overrides = {
  colors: {
    primary: {
      // base color is #01579b
      // https://smart-swatch.netlify.app/#01579b

      50: "#ddefff",
      100: "#aed0ff",
      200: "#7eb6ff",
      300: "#4e9efe",
      400: "#228afd",
      500: "#0d79e3",
      600: "#0164b1",
      700: "#003f80",
      800: "#00214f",
      900: "#00091f",
    },
    info: {
      // base color is #17a2b8
      // https://smart-swatch.netlify.app/#17a2b8

      50: "#daf6ff",
      100: "#b3e6fa",
      200: "#89d9f2",
      300: "#5ccfec",
      400: "#33c7e6",
      500: "#1ab4cc",
      600: "#0782a0",
      700: "#005572",
      800: "#002f47",
      900: "#000f1c",
    },
  },
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
  textStyles: {
    subtitle: {
      fontSize: "sm",
      fontStyle: "italic",
      color: "gray.600",
    },
  },
};

const theme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "blue" })
);

export default theme;
