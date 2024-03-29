import { Box, Button, ButtonGroup, Flex, HStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Heading, Paragraph } from "../components/typography";
import { personal } from "../lib/meta";
import ContentContainer from "../components/content-container";
import { Wave, WaveBottom, waveVariants } from "../components/waves";
import { ProjectCollection } from "../components/projects";
import { getAllProjectMetadata } from "../lib/projects";
import Link from "next/link";

/**
 * @typedef {import("@chakra-ui/react").BoxProps} BoxProps
 * @param {BoxProps} props the props object.
 */
const Section = ({ children, ...props }) => (
  <Box as="section" py={4} {...props}>
    <ContentContainer>{children}</ContentContainer>
  </Box>
);

export default function Home({ featuredProjects }) {
  return (
    <>
      <Flex direction="column" pb={5}>
        <Section
          bgGradient="linear(to-b, primary.600, primary.500)"
          color="white"
          textAlign="center"
          pt={6}
          pb={0}
        >
          <img
            src={personal.avatar}
            alt="Ben's Avatar"
            style={{ margin: "0 auto", borderRadius: "50%", height: 300 }}
          />
          <Heading mt={5} level={2}>{`Hi! I'm Ben.`}</Heading>
        </Section>
        <Wave
          variant={waveVariants.MIN1}
          fgColor="primary.500"
          bgColor="gray.100"
          shadow
        />

        <Section bgColor="gray.100" pt={2} pb={8}>
          <Heading level={2} mt={0}>
            About Me
          </Heading>
          <Paragraph>something interesting</Paragraph>
          <HStack>
            <Button colorScheme="info">Learn More</Button>
            <Button colorScheme="info" variant="outline">
              See Resume
            </Button>
          </HStack>
        </Section>
        <Wave
          variant={waveVariants.MIN1}
          fgColor="gray.100"
          height={6}
          flipX
          invert
          shadow
        />

        <Section>
          <Heading level={2}>Recent Blog Posts</Heading>
          <Paragraph>something interesting</Paragraph>
          <Button colorScheme="info">More Posts</Button>
        </Section>
        <Section>
          <Heading level={2}>Featured Projects</Heading>
          <ProjectCollection
            projects={featuredProjects}
            columns={[1, 2, null, null, 4]}
          />
          <ButtonGroup mt={5}>
            <Button as={Link} href="/projects" colorScheme="info">
              More Projects
            </Button>
          </ButtonGroup>
        </Section>
      </Flex>
    </>
  );
}

export const getStaticProps = () => ({
  props: {
    containerWrap: false,
    featuredProjects: getAllProjectMetadata(true),
  },
});
