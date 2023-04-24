import Markdown from "../../components/markdown";
import { getAllProjectPaths, getProjectMetadata } from "../../lib/projects";
import { useTina } from "tinacms/dist/react";

const BlogProject = ({ slug, href, ...props }) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const project = data.project;

  return (
    <>
      <h2>{project.title}</h2>

      <p>{project.date}</p>

      <Markdown content={project.body} />
    </>
  );
};

export default BlogProject;

export const getStaticPaths = async () => ({
  paths: await getAllProjectPaths(),
  fallback: false,
});

export const getStaticProps = async ({ params: { slug } }) => ({
  props: await getProjectMetadata(slug),
});
