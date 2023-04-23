import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { filterMatterResult } from "./markdown";
import { client } from "../tina/__generated__/client";
import { slugifyTitle } from "./slug";

/**
 * @typedef {Object} PostIdentifiers
 *
 * @property {string} year the year the post was published.
 * @property {string} month the month the post was published.
 * @property {string} day the day the post was published.
 * @property {string} slug the unique slug for the post.
 * @property {string} fileName the file name of the post.
 */

const parseDate = (dateString) => {
  const date = dateString
    ? new Date(dateString)
    : new Date("1970-01-01 00:00:00");
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "2-digit" });
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  return { year, month, day };
};

export const postNodeToFilename = (values) => {
  const { year, month, day } = parseDate(values.date);
  const slug = slugifyTitle(values.title);
  return [year, month, day, slug].join("-");
};

// const postFilenameFormat =
//   /^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z0-9]+(-[a-z0-9]+)*).md$/;

/**
 * postIdentifiersToFilePath recreates the filename and path for a given post
 * based on its identifiers.
 *
 * @param {PostIdentifiers} param0 the identifiers object for this post.
 *
 * @returns {string} the path to the post's markdown file.
 */
const postIdentifiersToFileName = ({ year, month, day, slug }) =>
  `${year}-${month}-${day}-${slug}.md`;

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
 * @returns {Promise.<[]PostIdentifiers>} an array of all known post
 *   identifiers.
 */
export const getAllPostPaths = async () => {
  const res = await client.queries.postConnection();
  return res.data.postConnection.edges.map((edge) => {
    const slug = slugifyTitle(edge.node.title);
    const { year, month, day } = parseDate(edge.node.date);
    return { params: { slug, year, month, day } };
  });
};

/**
 * getPostMetadata retrieves the metadata for a specific post.
 *
 * @param {PostIdentifiers} identifiers the identifiers object for this post.
 *
 * @returns {Promise.<Object>} the metadata for this post.
 */
export const getPostMetadata = async (identifiers) => {
  const fileName = postIdentifiersToFileName(identifiers);
  const href = postIdentifiersToHref(identifiers);
  const res = await client.queries.post({ relativePath: fileName });
  return { identifiers, href, ...res.data.post };
};

/**
 * getAllPostMetadata retrieves the post metadata for all posts.
 *
 * @returns {Promise.<[]Object>} the metadata for all known posts.
 */
export const getAllPostMetadata = async () => {
  const res = await client.queries.postConnection();
  return res.data.postConnection.edges.map((edge) => {
    const slug = slugifyTitle(edge.node.title);
    const { year, month, day } = parseDate(edge.node.date);
    const identifiers = { slug, year, month, day };
    const href = postIdentifiersToHref(identifiers);

    return { identifiers, href, ...edge.node };
  });
};
