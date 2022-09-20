import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { filterMatterResult } from "./markdown";

/**
 * @typedef {Object} PostIdentifiers
 *
 * @property {string} year the year the post was published.
 * @property {string} month the month the post was published.
 * @property {string} day the day the post was published.
 * @property {string} slug the unique slug for the post.
 */

const postsDirectory = path.join(process.cwd(), "posts");

const postNameFormat =
  /^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z0-9]+(-[a-z0-9]+)*).md$/;

/**
 * parsePostIdentifiers uses regular expressions to parse the pieces of a
 * post's filename into its identifiers object.
 *
 * @param {String} name the filename of the post (no leading path).
 *
 * @returns {PostIdentifiers} the identifiers object for this post.
 */
const parsePostIdentifiers = (name) => {
  const match = postNameFormat.exec(name);
  if (!match) {
    throw new Error(`blog post name does not match format: '${name}'`);
  }

  const [, year, month, day, slug] = match;
  return { year, month, day, slug };
};

/**
 * postIdentifiersToFilePath recreates the filename and path for a given post
 * based on its identifiers.
 *
 * @param {PostIdentifiers} param0 the identifiers object for this post.
 *
 * @returns {string} the path to the post's markdown file.
 */
const postIdentifiersToFilePath = ({ year, month, day, slug }) =>
  path.join(postsDirectory, `${year}-${month}-${day}-${slug}.md`);

/**
 * postIdentifiersToHref creates a hyperlink reference that could be used to
 * construct links to this post based on its identifiers.
 *
 * @param {PostIdentifiers} param0 the identifiers object for this post.
 *
 * @returns {string} the relative (to root) hyperlink reference for this post.
 */
const postIdentifiersToHref = ({ year, month, day, slug }) =>
  `/blog/${year}/${month}/${day}/${slug}`;

/**
 * getAllPostPaths finds all posts and creates a list of their identifiers.
 *
 * @returns {[]PostIdentifiers} an array of all known post identifiers.
 */
export const getAllPostPaths = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: parsePostIdentifiers(fileName),
  }));
};

/**
 * getPostMetadata retrieves the metadata for a specific post.
 *
 * @param {PostIdentifiers} identifiers the identifiers object for this post.
 *
 * @returns {Object} the metadata for this post.
 */
export const getPostMetadata = (identifiers) => {
  const href = postIdentifiersToHref(identifiers);
  const filePath = postIdentifiersToFilePath(identifiers);
  const fileContents = fs.readFileSync(filePath, "utf8");
  // FIXME need to get better excerpt algorithm?
  const matterResult = matter(fileContents, { excerpt: true });
  const filteredMatterResult = filterMatterResult(matterResult);

  return {
    identifiers,
    filePath,
    href,

    ...filteredMatterResult,
  };
};

/**
 * getAllPostMetadata retrieves the post metadata for all posts.
 *
 * @returns {[]Object} the metadata for all known posts.
 */
export const getAllPostMetadata = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  // const data = fileNames.map(getPostMetadata);
  const data = fileNames.map((fileName) => {
    const identifiers = parsePostIdentifiers(fileName);
    return getPostMetadata(identifiers);
  });
  return data;
};
