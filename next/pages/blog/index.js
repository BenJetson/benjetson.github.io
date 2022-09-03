import { getAllPostMetadata } from "../../lib/posts";
import Link from "next/link";

const Blog = ({ posts }) => {
  return (
    <>
      <h2>Blog</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.filePath}>
            <Link href={post.href}>
              <a>{post.frontMatter.title}</a>
            </Link>
            <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;

export const getStaticProps = async () => ({
  props: { posts: getAllPostMetadata() },
});
