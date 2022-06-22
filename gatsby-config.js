module.exports = {
  siteMetadata: {
    title: `Ben's Realm`,
    tagline: "The internet home for all of my personal projects and thoughts.",
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `./src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `./src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `./src/posts/`,
      },
      __key: "posts",
    },
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `./src/posts`,
    //   },
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `./src/projects/`,
      },
      __key: "projects",
    },
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `./src/projects`,
    //   },
    // },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        // defaultLayouts: {
        //   posts: require.resolve("./src/templates/blog-post.js"),
        //   projects: require.resolve("./src/templates/project-page.js"),
        // },
      },
    },
  ],
  jsxRuntime: "automatic",
};
