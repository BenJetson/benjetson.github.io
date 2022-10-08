import { Box, Heading, Text } from "@chakra-ui/react";
import { GIT_HASH } from "../lib/env";
import { site } from "../lib/meta";
import ContentContainer from "./content-container";
import CopyrightStatement from "./copyright";
import { Wave, waveVariants } from "./waves";

const Footer = () => (
  <footer>
    <Wave variant={waveVariants.SIDE1} fgColor="gray.700" flipY flipX invert />
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
