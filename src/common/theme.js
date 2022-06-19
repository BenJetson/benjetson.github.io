import { blueGrey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

/**
 * themeOptions is the base options for our MUI theme that should be set before
 * calling createTheme.
 *
 * This tool currently creates MUIv4 themes, but you can use it for inspiration:
 * https://bareynol.github.io/mui-theme-creator.
 */
let themeOptions = {
  palette: {
    type: "light",
    primary: { main: "#01579b" },
    secondary: { main: "#4fc3f7" },
    info: { main: "#128294" },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"]
      .map((value) => `"${value}"`)
      .join(", "),
    h1: { fontSize: "3.2rem" },
    h2: { fontSize: "2.3rem" },
    h3: { fontSize: "1.9rem" },
    h4: { fontSize: "1.6rem" },
    h5: { fontSize: "1.3rem" },
    h6: { fontSize: "1.2rem" },
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
addColor("blueGrey", blueGrey[800]);
addColor("pink", "#d63384");

// Build the actual final theme, with all customizations.
let theme = createTheme(themeOptions);

// Enable responsive font sizes.
theme = responsiveFontSizes(theme);

// Add default heading margins.
for (const heading of [
  theme.typography.h1,
  theme.typography.h2,
  theme.typography.h3,
  theme.typography.h4,
  theme.typography.h5,
  theme.typography.h6,
]) {
  heading.marginTop = theme.spacing(1);
  heading.marginBottom = theme.spacing(2);
}

export default theme;
