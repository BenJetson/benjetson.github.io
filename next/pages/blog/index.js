import { getAllPostMetadata } from "../../lib/posts";
import Link from "next/link";
import { Heading, List, ListItem } from "@chakra-ui/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";

const Blog = ({ posts }) => {
  return (
    <>
      <Heading as="h2">Blog</Heading>
      <List mt={3}>
        {posts.map((post) => (
          <ListItem key={post._sys.filename}>
            <Link href={post.href}>
              <Card>
                <CardHeader>
                  <CardTitle level={3}>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  Posted on {post.date} <br />
                  Preview:{" "}
                  {
                    // FIXME excerpts not working!
                    post.excerpt || "no excerpt available"
                  }
                </CardContent>
              </Card>
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
  props: { posts: await getAllPostMetadata() },
});
