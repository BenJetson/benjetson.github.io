import { TinaMarkdown } from "tinacms/dist/rich-text";
import NextImage from "next/image";

// TODO this CJS import version does not support dynamic language loading.
// I suspect this might increase the bundle size of the app, should investigate.
import Prism from "react-syntax-highlighter/dist/cjs/prism";

/**
 * This imports the theme to be used for the Prism highlighter.
 *
 * Some of my favorites:
 *    - coldarkCold - lighter and could go well with a light/blue theme.
 *    - coldarkDark
 *    - dracula
 *    - lucario
 *    - materialDark
 *    - materialOceanic
 *    - nightOwl
 *    - xonokai
 *
 * Strangely, autocomplete does not seem to show all themes. See list on disk:
 *    ls ./node_modules/react-syntax-highlighter/dist/cjs/styles/prism
 */
import { coldarkDark as codeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  Box,
  Code,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { Heading, Paragraph } from "./typography";
import { contentSpacing } from "../lib/theme";

const MdCode = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return (
    <Box mb={contentSpacing}>
      {!inline && match ? (
        <Prism
          style={codeStyle}
          language={match[1]}
          PreTag="div"
          showLineNumbers
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </Prism>
      ) : (
        <Code
          colorScheme={"pink"}
          px={1}
          py={0.5}
          className={className}
          {...props}
        >
          {children}
        </Code>
      )}
    </Box>
  );
};

const useNextImage = false; // FIXME should remove once we learn next/image
const imageDimensionsPattern = /^([1-9][0-9]*)x([1-9][0-9]*)$/;

/**
 * Image is a wrapper around next/image with some added features for captions
 * and more.
 *
 * This wrapper takes advantage of the existing alt-text field for Markdown
 * images and allows us to put additional information inside. This extra
 * information is called "declearations" and interprets the alt text as a list
 * delimited by a pipe (|) symbol.
 *
 * For example:
 *   ![tree frog jumps from branch | caption: Dryophytes cinereus](frog.jpg)
 *   ![| 500x20 | priority ](decorative_banner.png)
 *   ![| priority | caption: the Abraham Lincoln memorial](abe_in_dc.bmp)
 *   ![this has alt-text only](some_image.jpeg)
 *
 * The alt text is always the portion of the string from the beginning to the
 * first pipe symbol. To achieve blank alt text, simply start the image with no
 * space between the opening ![ and the | symbol, like the second and third
 * examples above.
 *
 * Declarations follow the alt text, starting at the first pipe symbol. Each
 * declaration should only be included once. They may be:
 *
 * - image dimensions, expressed as AxB, where A is width and B is height,
 *   measured in pixels.
 * - priority status, expressed simply as "priority", which causes next/image to
 *   disable lazy-loading behavior for this image.
 * - a caption, starting with "caption: " followed by the caption.
 *
 * This custom format allows us to stay within general markdown syntax while
 * also getting the information we need for next/image and captions.
 *
 * @param {Object} param0
 * @param {Object} param0.properties
 * @param {string} param0.properties.alt
 * @param {string} param0.properties.src
 * @returns
 */
const MdImage = ({ properties: { alt, src } }) => {
  const [altText, ...declarations] = alt
    .split("|")
    .map((value) => value.trim());
  let caption = null;
  const nextImageProps = { src, alt: altText };

  for (const declaration of declarations) {
    let match;

    if (declaration === "priority") {
      nextImageProps.priority = true;
    } else if (declaration.startsWith("caption:")) {
      caption = declaration.substring("caption:".length).trim();
    } else if ((match = imageDimensionsPattern.exec(declaration))) {
      const [, widthStr, heightStr] = match;
      nextImageProps.width = parseInt(widthStr);
      nextImageProps.height = parseInt(heightStr);
    }
  }

  return (
    <div className="imageWrapper">
      {(useNextImage && <NextImage {...nextImageProps} />) || (
        <img className="responsiveImg" src={src} alt={altText} />
      )}
      {caption && <div className="caption">{caption}</div>}
    </div>
  );
};

const MdParagraph = ({ children }) => <Paragraph>{children}</Paragraph>;

const MdTable = ({ children, ...props }) => {
  return (
    <Table
      variant={"striped"}
      mb={contentSpacing}
      colorScheme="gray"
      {...props}
    >
      {children}
    </Table>
  );
};

/**
 * @typedef {import('@chakra-ui/react').ListProps} ListProps
 * @type {ListProps}
 */
const listProps = { mb: contentSpacing };

const MdOrderedList = ({ children }) => (
  <OrderedList {...listProps}>{children}</OrderedList>
);

const MdUnorderedList = ({ className, children }) =>
  className === "contains-task-list" ? (
    <List {...listProps}>{children}</List>
  ) : (
    <UnorderedList {...listProps}>{children}</UnorderedList>
  );

const MdTaskListCheck = ({ checked }) => (
  <ListIcon as={checked ? FaRegCheckCircle : FaRegCircle} />
);

const MdHeading1 = ({ children }) => <Heading level={1}>{children}</Heading>;
const MdHeading2 = ({ children }) => <Heading level={2}>{children}</Heading>;
const MdHeading3 = ({ children }) => <Heading level={3}>{children}</Heading>;
const MdHeading4 = ({ children }) => <Heading level={4}>{children}</Heading>;
const MdHeading5 = ({ children }) => <Heading level={5}>{children}</Heading>;
const MdHeading6 = ({ children }) => <Heading level={6}>{children}</Heading>;

const NoContent = () => null;

const Markdown = ({ content }) => (
  <TinaMarkdown
    components={{
      // Standard Markdown //

      // a: undefined,
      // blockquote: undefined,
      // br: undefined,
      h1: MdHeading1,
      h2: MdHeading2,
      h3: MdHeading3,
      h4: MdHeading4,
      h5: MdHeading5,
      h6: MdHeading6,
      // hr: undefined,
      img: MdImage,
      p: MdParagraph,
      // pre: undefined,
      code: MdCode,
      // em: undefined,
      // strong: undefined,
      ul: MdUnorderedList,
      ol: MdOrderedList,
      li: ListItem,

      // GitHub Markdown //

      // del: undefined,
      // input: MdTaskListCheck,
      // table: MdTable,
      // tbody: Tbody,
      // td: Td,
      // th: Th,
      // thead: Thead,
      // tr: Tr,
    }}
    content={content}
  />
);

export default Markdown;
