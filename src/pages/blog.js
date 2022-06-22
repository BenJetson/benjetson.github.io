import { Typography } from "@mui/material";
import { graphql, Link, useStaticQuery } from "gatsby";
import Container from "../components/Container";

const BlogListing = () => {
  const pages = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
        nodes {
          childrenMdx {
            id
            frontmatter {
              title
            }
          }
          fields {
            publishDate {
              day
              month
              year
            }
            slug
          }
        }
      }
    }
  `);

  return (
    <Container>
      <Typography variant="h1">Listing of Blog Posts</Typography>
      <ul>
        {pages.allFile.nodes.map((node) => {
          const {
            childrenMdx: [
              {
                id,
                frontmatter: { title },
              },
            ],
            fields: {
              publishDate: { day, month, year },
              slug,
            },
          } = node;
          return (
            <Typography component="li" variant="body1" key={id}>
              <Link to={`/blog/${year}/${month}/${day}/${slug}`}>{title}</Link>
            </Typography>
          );
        })}
      </ul>
    </Container>
  );
};

export default BlogListing;
