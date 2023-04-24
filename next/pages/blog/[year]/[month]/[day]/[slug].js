import { Heading, Text } from "@chakra-ui/react";
import { getAllPostPaths, getPostMetadata } from "../../../../../lib/posts";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";

const BlogPost = ({ identifiers, href, ...props }) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const post = data.post;

  return (
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
};

export default BlogPost;

export const getStaticPaths = async () => ({
  paths: await getAllPostPaths(),
  fallback: false,
});

export const getStaticProps = async ({ params }) => ({
  props: await getPostMetadata(params),
});
