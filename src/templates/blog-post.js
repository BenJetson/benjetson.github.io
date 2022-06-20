import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import Container from "../components/Container";

export const query = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;

const BlogPost = ({
  // pageContext: { id },
  data: {
    markdownRemark: {
      id,
      excerpt,
      html,
      frontmatter: { title, date, description },
    },
  },
}) => {
  return (
    <Container>
      <Typography variant="h1">{title}</Typography>
      <Typography
        variant="body1"
        // XXX this is a hack to get the body text right ... need a better way
      >
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Typography>
    </Container>
  );
};

export default BlogPost;
