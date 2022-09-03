import { getAllProjectPaths, getProjectMetadata } from "../../lib/projects";

const BlogProject = ({ project }) => (
  <>
    <h2>{project.frontMatter.title}</h2>

    <p>{project.frontMatter.date}</p>
    <pre>{project.content}</pre>
  </>
);

export default BlogProject;

export const getStaticPaths = async () => ({
  paths: getAllProjectPaths(),
  fallback: false,
});

export const getStaticProps = async ({ params: { slug } }) => ({
  props: { project: getProjectMetadata(slug) },
});
