import { getAllProjectMetadata } from "../../lib/projects";
import Link from "next/link";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Hide,
  Image,
  List,
  ListItem,
  Show,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CardTitle } from "../../components/card";
import { formatAsMonthDate } from "../../lib/date";

const ProjectCard = ({ project }) => (
  // FIXME this shold use LinkOverlay
  // https://chakra-ui.com/docs/components/link-overlay
  <Link href={project.href}>
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
      {/* <CardFooter>
                  <ButtonGroup>
                    <Button>Read</Button>
                    <Button variant="ghost">Repository</Button>
                    <Button variant="ghost">Webpage</Button>
                  </ButtonGroup>
                </CardFooter> */}
    </Card>
  </Link>
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
