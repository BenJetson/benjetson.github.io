import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

const Code = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
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
    <code className={className} {...props}>
      {children}
    </code>
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
const Image = ({ properties: { alt, src } }) => {
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

const Paragraph = ({ node, children }) => {
  // Markdown is a strange bird. Technically, images should not be nested inside
  // of paragraph tags, so we'll override this behavior.
  //
  // Source: https://amirardalan.com/blog/use-next-image-with-react-markdown
  if (node.children[0].tagName === "img") {
    return <Image {...node.children[0]} />;
  }

  return <p>{children}</p>;
};

const Heading1 = ({ children }) => <h1>{children}</h1>;
const Heading2 = ({ children }) => <h2>{children}</h2>;
const Heading3 = ({ children }) => <h3>{children}</h3>;
const Heading4 = ({ children }) => <h4>{children}</h4>;
const Heading5 = ({ children }) => <h5>{children}</h5>;
const Heading6 = ({ children }) => <h6>{children}</h6>;

const Markdown = ({ content }) => (
  <ReactMarkdown
    skipHtml
    remarkPlugins={[remarkGfm]}
    components={{
      // Standard Markdown //

      // a: undefined,
      // blockquote: undefined,
      // br: undefined,
      code: Code,
      // em: undefined,
      h1: Heading1,
      h2: Heading2,
      h3: Heading3,
      h4: Heading4,
      h5: Heading5,
      h6: Heading6,
      // hr: undefined,
      // img: handled as part of Paragraph, see notes.
      // li: undefined,
      // ol: undefined,
      p: Paragraph,
      // pre: undefined,
      // strong: undefined,
      // ul: undefined,

      // GitHub Markdown //

      // del: undefined,
      // input: undefined,
      // table: undefined,
      // tbody: undefined,
      // td: undefined,
      // th: undefined,
      // thead: undefined,
      // tr: undefined,
    }}
  >
    {content}
  </ReactMarkdown>
);

export default Markdown;
