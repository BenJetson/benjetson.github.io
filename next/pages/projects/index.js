import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import ContentContainer from "../../components/content-container";
import { ProjectCollection } from "../../components/projects";
import { Wave, waveVariants } from "../../components/waves";
import { socials } from "../../lib/meta";
import { getAllProjectMetadata } from "../../lib/projects";
import { Link as ChakraNextLink } from "@chakra-ui/next-js";

/**
 * @typedef { import('@chakra-ui/react').BackgroundProps['bgColor'] } ColorToken
 */

const PageSection = ({ children, ...props }) => (
  <Box as="section" pt={4} pb={10} {...props}>
    <ContentContainer>{children}</ContentContainer>
  </Box>
);

/**
 * @param {Object} param0 the props object.
 * @param {string} param0.label the label for the section.
 * @param {ColorToken} param0.bgColor the background color for the section.
 */
const ProjectSection = ({
  label,
  projects,
  columns = undefined,
  bgColor = undefined,
}) => (
  <PageSection bgColor={bgColor}>
    <Heading as="h3" size="lg">
      {label}
    </Heading>
    <ProjectCollection projects={projects} columns={columns} />
  </PageSection>
);

const Projects = ({ otherProjects, featuredProjects }) => {
  return (
    <>
      <ContentContainer pb={5}>
        <Heading as="h2">Projects</Heading>
        <Text>
          {`I've`} been creating programs, bots, apps, and other things for a
          long time.
        </Text>
        <Text>
          This is a collection of some of my most notable works. If you like my
          work, perhaps I might be able to{" "}
          {/* FIXME links are not underlined or different color?! */}
          <ChakraNextLink href="/contact">
            build something for you, too
          </ChakraNextLink>
          .
        </Text>
      </ContentContainer>
      <Wave
        variant={waveVariants.SEMI1}
        bgColor={"blue.50"}
        fgColor={"white"}
      />
      <ProjectSection
        label="Featured Projects"
        projects={featuredProjects}
        bgColor="blue.50"
        columns={[1, 2]}
      />
      <Wave
        variant={waveVariants.SEMI1}
        invert
        fgColor={"blue.50"}
        bgColor={"white"}
      />
      <ProjectSection label="Other Projects" projects={otherProjects} />

      <PageSection>
        <Heading as="h3" size="lg">
          Missing Something?
        </Heading>
        <Text>
          This site only showcases select projects from my portfolio. You can
          find even more projects on my{" "}
          <ChakraLink href={socials.github.url}>GitHub profile</ChakraLink>.
        </Text>
      </PageSection>
    </>
  );
};

export default Projects;

export const getStaticProps = async () => ({
  props: {
    otherProjects: getAllProjectMetadata(false),
    featuredProjects: getAllProjectMetadata(true),
    containerWrap: false,
  },
});
