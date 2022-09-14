import { Container } from "@chakra-ui/react";

const ContentContainer = ({ children, ...props }) => (
  <Container maxW="6xl" {...props}>
    {children}
  </Container>
);

export default ContentContainer;
