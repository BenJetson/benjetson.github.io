import { TinaMarkdown } from "tinacms/dist/rich-text";
import { getAllProjectPaths, getProjectMetadata } from "../../lib/projects";

const BlogProject = ({ project }) => (
  <>
    <h2>{project.title}</h2>

    <p>{project.date}</p>

    <TinaMarkdown content={project.body} />
  </>
);

export default BlogProject;

export const getStaticPaths = async () => ({
  paths: await getAllProjectPaths(),
  fallback: false,
});

export const getStaticProps = async ({ params: { slug } }) => ({
  props: { project: await getProjectMetadata(slug) },
});
