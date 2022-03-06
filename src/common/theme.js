import { createTheme } from "@mui/material/styles";

/**
 * themeOptions is the unedited object from the MUI theme builder.
 *
 * Best to not alter the generated code in this object and make alterations
 * dynamically below, since reusing the MUI theme builder will not persist the
 * customizations.
 *
 * See also: https://bareynol.github.io/mui-theme-creator.
 */
let themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#01579b",
    },
    secondary: {
      main: "#4fc3f7",
    },
    info: {
      // main: "#4fc3f7",
      main: "#128294",
    },
  },
  typography: {
    fontFamily: 'Inter, "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.2rem",
    },
    h2: {
      fontSize: "2.3rem",
    },
    h3: {
      fontSize: "1.9rem",
    },
    h4: {
      fontSize: "1.6rem",
    },
    h5: {
      fontSize: "1.3rem",
    },
    h6: {
      fontSize: "1.2rem",
    },
  },
};

// Pull the palette utilities out of an empty theme.
const { palette: paletteUtils } = createTheme();

/**
 * addColor adds a new color to the theme palette.
 *
 * @param {string} name the name of the color to add.
 * @param {string} main the hex code of the main hue of the color.
 * @param {object} opts additional hues to add to the color.
 */
const addColor = (name, main, opts = {}) => {
  // Using the augmentColor palette utility creates the color using MUI magic,
  // which automatically calculates lighter, darker, contrastColor, etc.
  //
  // See also: https://stackoverflow.com/a/69264263.
  themeOptions.palette[name] = paletteUtils.augmentColor({
    color: {
      main,
      ...opts,
    },
  });
};

// Add my custom colors.
addColor("blueGrey", "#455a64");
addColor("pink", "#d63384");

// Build the actual final theme, with all customizations, and export.
const theme = createTheme(themeOptions);
export default theme;
