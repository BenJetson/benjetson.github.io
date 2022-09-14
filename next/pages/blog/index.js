import { getAllPostMetadata } from "../../lib/posts";
import Link from "next/link";
import {
  Heading,
  List,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Card, CardContent, CardHeader } from "../../components/card";

const Blog = ({ posts }) => {
  return (
    <>
      <Heading as="h2">Blog</Heading>
      <List mt={3}>
        {posts.map((post) => (
          <ListItem key={post.filePath}>
            <Link href={post.href}>
              <a>
                <Card>
                  <CardHeader>{post.frontMatter.title}</CardHeader>
                  <CardContent>
                    {post.frontMatter.date} <br />
                    Preview: {post.excerpt}
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

export default Blog;

export const getStaticProps = async () => ({
  props: { posts: getAllPostMetadata() },
});
