const BlogPage = () => (
  <>
    <h1>Blog</h1>
    <p>This is where the next page of results would be.</p>
  </>
);

export default BlogPage;

// TODO static props for blog results page
export const getStaticProps = () => ({ props: {} });

// TODO static paths for blog results page
export const getStaticPaths = () => ({
  paths: [{ params: { page: "1" } }],
  fallback: false,
});
