import Markdown from "../../../../../components/markdown";
import { getAllPostPaths, getPostMetadata } from "../../../../../lib/posts";

const BlogPost = ({ post }) => (
  <>
    <h2>{post.frontMatter.title}</h2>

    <p>{post.frontMatter.date}</p>

    <Markdown content={post.content} />
  </>
);

export default BlogPost;

export const getStaticPaths = async () => ({
  paths: getAllPostPaths(),
  fallback: false,
});

export const getStaticProps = async ({ params }) => ({
  props: { post: getPostMetadata(params) },
});
