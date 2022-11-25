import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  FaArrowRight,
  FaExternalLinkSquareAlt,
  FaGithub,
} from "react-icons/fa";
import { CardTitle } from "../../components/card";
import ContentContainer from "../../components/content-container";
import { formatAsMonthDate } from "../../lib/date";
import { getAllProjectMetadata } from "../../lib/projects";

const ProjectCard = ({ project }) => (
  // FIXME this shold use LinkOverlay
  // https://chakra-ui.com/docs/components/link-overlay

  <LinkBox display="flex" alignItems="stretch">
    <Card w="100%" backgroundColor="white">
      <CardBody>
        <Image
          borderWidth={1}
          borderStyle="solid"
          mb={6}
          borderRadius="lg"
          objectFit="cover"
          w="100%"
          maxH="180px"
          src={project.frontMatter.photo}
          alt={project.frontMatter["photo-alt"]}
        />

        {/* <HStack> */}
        <CardTitle level={3}>
          {project.frontMatter.title}
          {/* TODO consider this - crown for featured */}
          {/*
            {project.frontMatter.featured && (
              <FaCrown style={{ display: "inline-block", marginLeft: 10 }} />
            )}
            */}
        </CardTitle>
        {/* </HStack> */}
        <Text textStyle="subtitle">
          {formatAsMonthDate(project.frontMatter.date)}
        </Text>
        <Text noOfLines={3}>{project.frontMatter.description}</Text>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup>
          <NextLink
            href={project.href}
            passHref
            // FIXME find a way to do this without double anchor or legacy mode.
            legacyBehavior
          >
            <LinkOverlay>
              <Button variant="outline" as="span" rightIcon={<FaArrowRight />}>
                Read
              </Button>
            </LinkOverlay>
          </NextLink>
          {project.frontMatter.repo && project.frontMatter.username && (
            <IconButton
              as="a"
              href={new URL(
                `/${project.frontMatter.username}/${project.frontMatter.repo}`,
                `https://github.com`
              ).toString()}
              variant="ghost"
              icon={<FaGithub />}
            />
          )}
          {project.frontMatter.webpage && (
            <IconButton
              as="a"
              href={project.frontMatter.webpage}
              variant="ghost"
              icon={<FaExternalLinkSquareAlt />}
            />
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  </LinkBox>
);

const ProjectCollection = ({ projects, columns = [1, 2, null, 3] }) => (
  <SimpleGrid columns={columns} spacing={6}>
    {projects.map((project) => (
      <ProjectCard project={project} key={project.filePath} />
    ))}
  </SimpleGrid>
);

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
