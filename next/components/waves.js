import { Box, useToken } from "@chakra-ui/react";

// Found a handy little tool for generating these wave paths:
//    https://smooth.ie/blogs/news/svg-wavey-transitions-between-sections
//
// However, it is also very easy to just make these myself in Pixelmator:
//   - Use the Pen (*not* Freeform) tool and draw 4 points.
//   - Make sure the shape is filled with no stroke.
//   - Right click with the pointer tool and select Make Editable.
//   - Drag the top corners to the corner of the canvas.
//   - Drag down a horizontal ruler some distance below the top.
//   - Drag the bottom corners to the ruler.
//   - Right click on each bottom corner and select Make Smooth Point.
//   - Drag the bezier handles to make the desired curve.
//   - Resize the Canvas appropriately.
//   - Export as an SVG file.
//   - Open the SVG in a text editor and get the path from d="".
//   - Paste path here, also note viewBox dimensions from the SVG.
//
// TODO ^^ this would make a great blog post!

/**
 * @enum {string}
 * @readonly
 */
export const waveVariants = {
  BASIC1: "basic1",
  BASIC2: "basic2",
  MIN1: "min1",
};

const variantDefinitions = {
  [waveVariants.BASIC1]: {
    path: `M -0 0 L 1920 0 C 1920 0 1956.814209 104.952148 1920 113.142853 C 991.962036 319.621094 757.968079 48.270935 -0 113.142853 C -37.57692 116.358963 -0 0 -0 0 Z`,
    viewBoxWidth: 1920,
    viewBoxHeight: 192,
    defaultHeight: 10,
  },
  [waveVariants.BASIC2]: {
    path: `M-41.19,-5.42 C226.30,144.56 271.44,10.36 540.06,10.36 L507.34,-18.25 L-10.15,-18.25 Z`,
    viewBoxWidth: 500,
    viewBoxHeight: 80,
    defaultHeight: 10,
  },
  [waveVariants.MIN1]: {
    path: `M -0 -96 L 1920 -96 C 1920 -96 1956.814209 8.952148 1920 17.142853 C 991.962036 223.621094 757.968079 -47.729065 -0 17.142853 C -37.57692 20.358963 -0 -96 -0 -96 Z`,
    viewBoxWidth: 1920,
    viewBoxHeight: 96,
    defaultHeight: 10,
  },
};

/**
 *
 * @param {Object} param0 the props object.
 * @param {waveVariants} param0.variant the variant of wave to use.
 * @param {number} param0.height height
 * @returns
 */
export const Wave = ({
  variant,
  height,
  fgColor,
  bgColor,
  flipX = false,
  flipY = false,
}) => {
  if (!variantDefinitions[variant]) {
    throw new Error(`no such wave variant '${variant}'`);
  }

  const { path, viewBoxHeight, viewBoxWidth, defaultHeight } =
    variantDefinitions[variant];
  [fgColor] = useToken("colors", [fgColor]);

  // Handle flipping a wave using CSS. Nice that scale() is about the image
  // image center already, so no translation/movement is necessary after.
  let transformation = undefined;
  if (flipX || flipY) {
    const xFactor = flipX ? -1 : 1;
    const yFactor = flipY ? -1 : 1;
    transformation = `scale(${xFactor}, ${yFactor})`;
  }

  return (
    <Box
      height={height || defaultHeight || 8}
      overflow="hidden"
      bgColor={bgColor}
    >
      <svg
        viewBox={[0, 0, viewBoxWidth, viewBoxHeight].join(" ")}
        preserveAspectRatio="none"
        style={{
          height: "100%",
          width: "100%",
          transform: transformation,
        }}
      >
        <path d={path} style={{ stroke: "none", fill: fgColor }}></path>
      </svg>
    </Box>
  );
};
