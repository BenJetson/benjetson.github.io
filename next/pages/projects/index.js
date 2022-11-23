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

const Projects = ({ projects }) => {
  return (
    <>
      <Heading as="h2">Projects</Heading>
      <SimpleGrid columns={[1, 2, null, 3]} spacing={10}>
        {projects.map((project) => (
          // FIXME this shold use LinkOverlay
          // https://chakra-ui.com/docs/components/link-overlay
          <Link href={project.href} key={project.filePath}>
            <Card
              // backgroundColor={"#f8f9fa"}
              // direction={{ base: "column", sm: "row" }}
              alignItems="stretch"
              overflow="hidden"
            >
              <CardBody flexShrink={1} flexGrow={0} mb={0}>
                <Image
                  borderRadius="lg"
                  objectFit="cover"
                  // maxW={{ base: "100%", sm: "180px" }}
                  // minW={{ base: "100%", sm: "180px" }}
                  // minH={{ base: "100%", sm: "180px" }}
                  // maxH={{ base: "180px", sm: "100%" }}
                  maxW="100%"
                  minW="100%"
                  minH="100%"
                  maxH="180px"
                  src={project.frontMatter.photo}
                  alt={project.frontMatter["photo-alt"]}
                />
              </CardBody>
              {/* <Show below="sm">
                <Divider />
              </Show>
              <Hide below="sm">
                <Divider orientation="vertical" height="inherit" />
              </Hide> */}
              <Stack>
                {/* <CardHeader>
                    <Heading level={3} size="md">
                      {project.frontMatter.title}
                    </Heading>
                  </CardHeader> */}
                <CardBody>
                  <CardTitle level={3}>{project.frontMatter.title}</CardTitle>
                  <Text textStyle="subtitle">
                    {formatAsMonthDate(project.frontMatter.date)}
                  </Text>
                  <Text>
                    {
                      // FIXME excerpts not working!
                      project.excerpt ||
                        "No excerpt is available for this project."
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
              </Stack>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Projects;

export const getStaticProps = async () => ({
  props: { projects: getAllProjectMetadata() },
});
