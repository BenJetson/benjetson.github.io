import { getAllProjectMetadata } from "../../lib/projects";
import Link from "next/link";

const Projects = ({ projects }) => {
  return (
    <>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.filePath}>
            <Link href={project.href}>
              <a>{project.frontMatter.title}</a>
            </Link>
            <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Projects;

export const getStaticProps = async () => ({
  props: { projects: getAllProjectMetadata() },
});
