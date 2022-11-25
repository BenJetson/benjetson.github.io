import { Box, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import ContentContainer from "../../components/content-container";
import { ProjectCollection } from "../../components/projects";
import { getAllProjectMetadata } from "../../lib/projects";

const ProjectSection = ({
  label,
  projects,
  columns = undefined,
  backgroundColor = undefined,
}) => (
  <Box as="section" backgroundColor={backgroundColor} pt={4} pb={10}>
    <ContentContainer>
      <Heading as="h3" size="lg">
        {label}
      </Heading>
      <ProjectCollection projects={projects} columns={columns} />
    </ContentContainer>
  </Box>
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
          <NextLink
            passHref
            href="/contact"
            // FIXME find a way to do this without double anchor or legacy mode.
            legacyBehavior
          >
            <Link>build something for you, too</Link>
          </NextLink>
          .
        </Text>
      </ContentContainer>
      <ProjectSection
        label="Featured Projects"
        projects={featuredProjects}
        backgroundColor="blue.50"
        columns={[1, 2]}
      />
      <ProjectSection label="Other Projects" projects={otherProjects} />
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
