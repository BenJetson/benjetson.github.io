import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Typography } from "@mui/material";
import Container from "../components/Container";

export const query = graphql`
  query ProjectPageQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        date
        title
      }
    }
  }
`;

const ProjectPage = (props) => {
  const {
    mdx: {
      id,
      body,
      frontmatter: { date, title },
    },
  } = props.data;

  return (
    <Container>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <Typography variant="h1">PROJECT: {title}</Typography>
      <MDXRenderer>{body}</MDXRenderer>
    </Container>
  );
};

export default ProjectPage;
