import { getAllProjectMetadata } from "../../lib/projects";
import Link from "next/link";
import { Heading, List, ListItem } from "@chakra-ui/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";

const Projects = ({ projects }) => {
  return (
    <>
      <Heading as="h2">Projects</Heading>
      <List mt={3}>
        {projects.map((project) => (
          <ListItem key={project.filePath}>
            <Link href={project.href}>
              <a>
                <Card>
                  <CardHeader>
                    <CardTitle level={3}>{project.frontMatter.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Posted on {project.frontMatter.date} <br />
                    Preview:{" "}
                    {
                      // FIXME excerpts not working!
                      project.excerpt || "no excerpt available"
                    }
                  </CardContent>
                </Card>
              </a>
            </Link>
            <br />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Projects;

export const getStaticProps = async () => ({
  props: { projects: getAllProjectMetadata() },
});
