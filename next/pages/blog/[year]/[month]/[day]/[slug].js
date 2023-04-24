import { Heading, Text } from "@chakra-ui/react";
import { getAllPostPaths, getPostMetadata } from "../../../../../lib/posts";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const BlogPost = ({ post }) => (
  <>
    <Heading as="h2" py={4}>
      {post.title}
    </Heading>
    <Text fontSize="lg" pb={4} mb={4} borderBottom="1px">
      Posted {post.date} by Ben Godfrey
    </Text>

    <TinaMarkdown content={post.body} />
  </>
);

export default BlogPost;

export const getStaticPaths = async () => ({
  paths: await getAllPostPaths(),
  fallback: false,
});

export const getStaticProps = async ({ params }) => ({
  props: { post: await getPostMetadata(params) },
});
