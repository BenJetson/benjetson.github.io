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
  SEMI1: "semi1",
  SIDE1: "side1",
  INK1: "ink1",
  INK2: "ink2",
};

/**
 * @typedef {Object} WaveDefinition
 * @property {string} path the SVG path of the wave.
 * @property {number} viewBoxWidth the width of the SVG viewBox.
 * @property {number} viewBoxHeight the height of the SVG viewBox.
 * @property {number} [defaultHeight] the default height of the Box that bounds
 *    the wave shape. Uses Chakra shorthand.
 */

/** @type {Object.<string, WaveDefinition>} */
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
  [waveVariants.SEMI1]: {
    path: `M 5e-06 -106.999985 L 1920 -106.999985 C 1920 -106.999985 1957.434326 1.555214 1920 6.142853 C 959.516174 123.851852 960.07666 125.882744 5e-06 6.142853 C -37.424351 1.475311 5e-06 -106.999985 5e-06 -106.999985 Z`,
    viewBoxWidth: 1920,
    viewBoxHeight: 96,
    defaultHeight: 8,
  },
  [waveVariants.SIDE1]: {
    path: `M 7e-06 -106.999985 L 1920 -106.999985 C 1920 -106.999985 2007.894653 -20.731239 1920 6.142853 C 1345.662354 181.748566 1080.560425 43.608326 7e-06 6.142853 C -37.691643 4.835999 7e-06 -106.999985 7e-06 -106.999985 Z`,
    viewBoxWidth: 1920,
    viewBoxHeight: 96,
    defaultHeight: 6,
  },
  [waveVariants.INK1]: {
    path: `M 2.800015e-4,0 0,8.740347 C -2.299985e-4,16.008127 26.45379,27.548696 39.7413,30.46007 231.44287,72.463039 384.7753,82.668051 630.93646,70.670212 877.09763,58.672372 1217.525,32.112759 1809.5627,51.634343 1846.6409,52.85694 1920.0003,32.016308 1920.0003,10.000137 V 0 Z`,
    viewBoxWidth: 1920,
    viewBoxHeight: 75.358315,
    defaultHeight: 10,
  },
  [waveVariants.INK2]: {
    path: `M 2.800015e-4,0 0,8.740347 C -2.299985e-4,16.008127 26.45379,27.548696 39.7413,30.46007 231.44287,72.463039 384.7753,82.668051 630.93646,70.670212 877.09763,58.672372 1217.525,32.112759 1809.5627,51.634343 1846.6409,52.85694 1920.0003,32.016308 1920.0003,10.000137 V 0 Z`,
    viewBoxWidth: 1920,
    viewBoxHeight: 100,
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
  invert = false,
  // TODO I feel this should allow for some customization, surely one shadow
  // size doesn't work everywhere?
  shadow = false,
}) => {
  if (!variantDefinitions[variant]) {
    throw new Error(`no such wave variant '${variant}'`);
  }

  // When inverting the SVG path, also reverse the scaling so that the result is
  // the same direction in the document.
  if (invert) [flipY, flipX] = [!flipY, !flipX];

  let { path, viewBoxHeight, viewBoxWidth, defaultHeight } =
    variantDefinitions[variant];
  [fgColor] = useToken("colors", [fgColor]);

  // Make sure added shadow height does not get cut off by viewBox.
  // FIXME should probably use a more precise value here.
  if (shadow) viewBoxHeight += 5;

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
        }}
      >
        {shadow && (
          <defs>
            <filter id="shadowFilter">
              <feDropShadow
                dx="0"
                stdDeviation={3}
                floodOpacity={0.5}
                // FIXME Should probably set floodColor to something from theme.
              />
            </filter>
          </defs>
        )}

        {(!invert && (
          <path
            d={path}
            fill={fgColor}
            stroke="none"
            transform-origin="center center"
            transform={transformation}
            filter={shadow ? "url(#shadowFilter)" : undefined}
          />
        )) || (
          <>
            <defs>
              <mask id="exclusion">
                <rect width="100%" height="100%" fill="white" stroke="none" />
                <path fill="black" stroke="none" d={path} />
              </mask>
            </defs>

            <g
              // Need to ensure the shadow filter is applied after masking, so
              // we place the rectangle in a group.
              filter={shadow ? "url(#shadowFilter)" : undefined}
              width="100%"
              height="100%"
            >
              <g
                width="100%"
                height="100%"
                transform-origin={`center center`}
                transform={transformation}
              >
                <rect
                  width="100%"
                  height="100%"
                  fill={fgColor}
                  mask="url(#exclusion)"
                />
              </g>
            </g>
          </>
        )}
      </svg>
    </Box>
  );
};
