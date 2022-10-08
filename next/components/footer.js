import { Box, Heading, Text } from "@chakra-ui/react";
import { GIT_HASH } from "../lib/env";
import { site } from "../lib/meta";
import ContentContainer from "./content-container";
import CopyrightStatement from "./copyright";

const Footer = () => (
  <footer>
    <Box maxW="full" p={5} bgColor="gray.700" color="white">
      <ContentContainer>
        <Heading as="h2">{site.title}</Heading>
        <Text>{site.tagline}</Text>
        <CopyrightStatement />
        <pre>build {GIT_HASH}</pre>
      </ContentContainer>
    </Box>
  </footer>
);

export default Footer;
