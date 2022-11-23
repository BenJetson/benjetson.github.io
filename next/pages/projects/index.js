import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FaArrowRight,
  FaExternalLinkSquareAlt,
  FaGithub,
} from "react-icons/fa";
import { CardTitle } from "../../components/card";
import { formatAsMonthDate } from "../../lib/date";
import { getAllProjectMetadata } from "../../lib/projects";

const ProjectCard = ({ project }) => (
  // FIXME this shold use LinkOverlay
  // https://chakra-ui.com/docs/components/link-overlay

  <LinkBox>
    <Card>
      <CardBody>
        <Image
          borderWidth={1}
          borderStyle="solid"
          mb={6}
          borderRadius="lg"
          objectFit="cover"
          maxW="100%"
          minW="100%"
          minH="100%"
          maxH="180px"
          src={project.frontMatter.photo}
          alt={project.frontMatter["photo-alt"]}
        />

        <CardTitle level={3}>{project.frontMatter.title}</CardTitle>
        <Text textStyle="subtitle">
          {formatAsMonthDate(project.frontMatter.date)}
        </Text>
        <Text>
          {
            // FIXME excerpts not working!
            project.excerpt || "No excerpt is available for this project."
          }
        </Text>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup>
          <Link
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
          </Link>
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

const Projects = ({ projects }) => {
  return (
    <>
      <Heading as="h2">Projects</Heading>
      <SimpleGrid columns={[1, 2, null, 3]} spacing={6}>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.filePath} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Projects;

export const getStaticProps = async () => ({
  props: { projects: getAllProjectMetadata() },
});
