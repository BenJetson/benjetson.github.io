import { Link as MUILink } from "@mui/material";
import { GatsbyLink } from "gatsby";

const SmartLink = ({ href, children }) => {
  const baseURL = new URL(document.baseURI);
  const givenURL = new URL(href, document.baseURI);

  // Compare origins to determine if link is relative.
  // https://stackoverflow.com/a/57047786
  let isRelative = baseURL.origin === givenURL.origin;
  let hasFragment = !!givenURL.hash;

  if (isRelative) {
    if (hasFragment) {
      // Gatsby's links do not support fragments (#), so we use a regular
      // link without opening in a new tab.
      return <MUILink href={href}>{children}</MUILink>;
    }

    // For relative links with no fragment, use the Gatsby link component for
    // fast in-app routing.
    return (
      <MUILink to={href} component={GatsbyLink}>
        {children}
      </MUILink>
    );
  }

  // This is an external link. Open in a new tab for safety.
  return (
    <MUILink href={href} target="_blank">
      {children}
    </MUILink>
  );
};

export default SmartLink;
