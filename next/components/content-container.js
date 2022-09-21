import { Container } from "@chakra-ui/react";

/**
 * ContentContainer is a wrapper for Chakra's Container that provides a constant
 * default width.
 *
 * @typedef {import("@chakra-ui/react").ContainerProps} ContainerProps
 * @param {ContainerProps} param0 the props object.
 */
const ContentContainer = ({ children, ...props }) => (
  <Container maxW="6xl" {...props}>
    {children}
  </Container>
);

export default ContentContainer;
