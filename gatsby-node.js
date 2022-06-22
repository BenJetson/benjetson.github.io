const path = require(`path`);

const blogPostNameFormat =
  /^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z0-9]+(-[a-z0-9]+)*)$/;

exports.onCreateNode = ({ node, actions: { createNodeField }, reporter }) => {
  if (node.internal.type === "File") {
    switch (node.sourceInstanceName) {
      case "projects":
        break;
      case "posts":
        const match = blogPostNameFormat.exec(node.name);
        if (!match)
          reporter.panicOnBuild(
            `blog post name does not match format: '${node.name}'`
          );

        const [, year, month, day, slug] = match;
        const date = `${year}/${month}/${day}`;

        createNodeField({
          name: "publishDate",
          node,
          value: {
            year,
            month,
            day,
            date,
          },
        });
        createNodeField({
          name: "slug",
          node,
          value: slug,
        });
        break;

      // no default
    }
  }
};

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  const { data, errors } = await graphql(`
    query {
      posts: allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
        nodes {
          childrenMdx {
            id
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
      projects: allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
        nodes {
          childrenMdx {
            id
            slug
          }
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild(
      "There was an error querying markdown files.",
      errors
    );
    return;
  }

  // Load page templates.
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const projectPageTemplate = path.resolve(`src/templates/project-page.js`);

  // Extract data from bundle.
  const posts = data.posts.nodes;
  const projects = data.projects.nodes;

  // Build posts pages.
  for (const post of posts) {
    const {
      childrenMdx: [{ id }],
      fields: {
        publishDate: { year, month, day },
        slug,
      },
    } = post;
    console.log;

    createPage({
      path: `/blog/${year}/${month}/${day}/${slug}`,
      component: blogPostTemplate,
      context: { id },
    });
  }

  // Build project pages.
  for (const project of projects) {
    const {
      childrenMdx: [{ id, slug }],
    } = project;

    createPage({
      path: `/projects/${slug}`,
      component: projectPageTemplate,
      context: { id },
    });
  }
};
