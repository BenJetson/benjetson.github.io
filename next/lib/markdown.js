import matter from "gray-matter";

/**
 * filterMatterResult provides filtered output from matter. The goal is for the
 * output to be serializable so next.js can process it statically.
 *
 * @param {matter.GrayMatterFile} matterResult the result of calling matter on
 *    a markdown file's contents.
 */
export const filterMatterResult = (matterResult) => ({
  frontMatter: matterResult.data,
  excerpt: matterResult.excerpt,
  content: matterResult.content,
});
