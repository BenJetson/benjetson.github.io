import { Heading, Text } from "@chakra-ui/react";
import Markdown from "../../../../../components/markdown";
import { getAllPostPaths, getPostMetadata } from "../../../../../lib/posts";

const BlogPost = ({ post }) => (
  <>
    <Heading as="h2" py={4}>
      {post.frontMatter.title}
    </Heading>
    <Text fontSize="lg" pb={4} mb={4} borderBottom="1px">
      Posted {post.frontMatter.date} by Ben Godfrey
    </Text>

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
