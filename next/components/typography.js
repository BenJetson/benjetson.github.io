import { Heading as CkHeading, Text } from "@chakra-ui/react";
import { contentSpacing } from "../lib/theme";

/**
 * Heading is a replacement for Chakra's default Heading that provides
 * standardized sizes for each heading level.
 *
 * @typedef {import("@chakra-ui/react").HeadingProps} CkHeadingProps
 *
 * @typedef {Object} LevelProps
 * @property {number} level the heading's level, a number 1 through 6.
 *
 * @typedef {CkHeadingProps & LevelProps} HeadingProps
 *
 * @param {HeadingProps} param0 the props object.
 */
export const Heading = ({ level, children, ...props }) => {
  if (!level || level < 1 || level > 6) {
    throw new Error("heading level is required and must be between 1 and 6");
  }

  return (
    <CkHeading
      as={`h${level}`}
      size={
        {
          1: "2xl",
          2: "xl",
          3: "lg",
          4: "md",
          5: "sm",
          6: "sm",
        }[level]
      }
      fontStyle={level === 6 ? "italic" : undefined}
      mb={contentSpacing}
      {...props}
    >
      {children}
    </CkHeading>
  );
};

/** @typedef {import("@chakra-ui/react").TextProps} TextProps */

/**
 * Paragraph is a wrapper around Chakra's Text component that is suited for
 * paragraph text on the site.
 *
 * @param {TextProps} param0 the props object.
 */
export const Paragraph = ({ children, ...props }) => (
  <Text mb={contentSpacing} {...props}>
    {children}
  </Text>
);

/**
 * InlineText is a wrapper around Chakra's Text component that is a drop-in
 * replacement for <span> elements.
 *
 * @param {TextProps} param0 the props object.
 */
export const InlineText = ({ children, ...props }) => (
  <Text as="span" mb={0} {...props}>
    {children}
  </Text>
);
