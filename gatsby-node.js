const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 *
 * @param {string} absFilePath the absolute file path to the markdown file.
 *
 * @returns {string} a "slugified" version of the file name.
 */
const absFilePathToSlug = (absFilePath) => {
  // Get the part of the file path between the last "/" and the end.
  let slug = absFilePath.substring(absFilePath.lastIndexOf("/") + 1);
  // Get the part of the file name between the start and the first period.
  slug = slug.substring(0, slug.indexOf("."));
  // Replace any spaces with dash.
  slug = slug.replace(" ", "-");
  // URL encode to ensure all characters are safe for the path.
  slug = encodeURIComponent(slug);

  return slug;
};

const blogPostSlugFormat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}(-[a-z0-9]+)+$/;

/**
 *
 * @param {string} slug the slugified version of the file path.
 * @returns {string} a path to the post using the date from the slug.
 */
const slugToDatePath = (slug) => {
  const [year, month, day, ...title] = slug.split("-");
  return `${year}/${month}/${day}/` + title.join("-");
};

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  const { data, errors } = await graphql(`
    query {
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/src/projects/**" } }
      ) {
        nodes {
          id
          fileAbsolutePath
        }
      }
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/src/posts/**" } }
      ) {
        nodes {
          id
          fileAbsolutePath
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

  // so the goal here is just to pass the ID number of the post or something to
  // the page in the context
  //
  // the template will take the context data and do its own graphql query to get
  // the specifics like html, etc
  //
  // this means the graphql query in this file just needs enough to generate
  // the URL path and pass context info to the page
  for (const post of posts) {
    const slug = absFilePathToSlug(post.fileAbsolutePath);
    if (!blogPostSlugFormat.test(slug)) {
      throw new Error(`blog post has invalid slug: '${slug}'`);
    }
    const path = slugToDatePath(slug);

    createPage({
      path: `/blog/${path}`,
      component: blogPostTemplate,
      context: {
        id: post.id,
      },
    });
  }

  for (const project of projects) {
    const slug = absFilePathToSlug(project.fileAbsolutePath);
    createPage({
      path: `/projects/${slug}`,
      component: projectPageTemplate,
      context: {
        id: project.id,
      },
    });
  }
};
