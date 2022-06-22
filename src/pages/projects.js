import { Typography } from "@mui/material";
import { graphql, Link, useStaticQuery } from "gatsby";
import Container from "../components/Container";

const ProjectListing = () => {
  const pages = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
        nodes {
          childrenMdx {
            id
            slug
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  return (
    <Container>
      <Typography variant="h1">Listing of Project Pages</Typography>
      <ul>
        {pages.allFile.nodes.map((node) => {
          const {
            childrenMdx: [
              {
                id,
                slug,
                frontmatter: { title },
              },
            ],
          } = node;
          return (
            <Typography component="li" variant="body1" key={id}>
              <Link to={`/projects/${slug}`}>{title}</Link>
            </Typography>
          );
        })}
      </ul>
    </Container>
  );
};

export default ProjectListing;
