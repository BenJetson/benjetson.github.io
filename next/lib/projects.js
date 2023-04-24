import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { filterMatterResult } from "./markdown";
import { compareDates } from "./date";
import { slugifyTitle } from "./slug";
import { client } from "../tina/__generated__/client";

// It might be nice to include month and year in these filenames some day.
const projectNameFormat = /^([a-z0-9]+(-[a-z0-9]+)*).md$/;

export const projectNodeToFilename = (values) => slugifyTitle(values.title);

const projectSlugFromNode = (node) => {
  const filename = node._sys.basename;
  const match = projectNameFormat.exec(filename);
  if (!match) {
    throw new Error(`project name does not match format: '${filename}'`);
  }

  const [, slug] = match;
  return slug;
};

/**
 * projectSlugToFilePath recreates the filename and path for a given  project
 * based on its unique slug.
 *
 * @param {string} slug the unique slug for this project.
 *
 * @returns {string} the path to the project's markdown file.
 */
const projectSlugToFileName = (slug) => `${slug}.md`;

/**
 * projectSlugToHref creates a hyperlink reference that could be used to
 * construct links to this project based on its unique slug.
 *
 * @param {string} slug the unique slug for this project.
 *
 * @returns {string} the relative (to root) hyperlink reference for
 *    this project.
 */
const projectSlugToHref = (slug) => `/projects/${slug}`;

/**
 * getAllProjectPaths finds all projects and creates a list of their unique
 * slugs.
 *
 * @returns {[]string} an array of all known project slugs.
 */
export const getAllProjectPaths = async () => {
  const res = await client.queries.projectConnection();
  return res.data.projectConnection.edges.map((edge) => ({
    params: { slug: projectSlugFromNode(edge.node) },
  }));
};

/**
 * getProjectMetadata retrieves the metadata for a specific project, based on
 * its unique slug.
 *
 * @param {string} slug the unique slug for this project.
 *
 * @returns {Object} the metadata for this project.
 */
export const getProjectMetadata = async (slug) => {
  const fileName = projectSlugToFileName(slug);
  const href = projectSlugToHref(slug);
  const res = await client.queries.project({ relativePath: fileName });
  return { slug, href, ...res.data.project };
};

/**
 * getAllProjectMetadata retrieves the project metadata for all projects.
 *
 * @returns {[]Object} the metadata for all known projects.
 */
export const getAllProjectMetadata = async (featuredFilter = null) => {
  let sort = "date";
  const filter = {};

  if (featuredFilter !== null) filter.featured = { eq: featuredFilter };
  if (featuredFilter === true) sort = "rank";

  const res = await client.queries.projectConnection({ sort, filter });
  let out = res.data.projectConnection.edges.map((edge) => {
    const slug = projectSlugFromNode(edge.node);
    const href = projectSlugToHref(slug);
    return { slug, href, ...edge.node };
  });

  if (featuredFilter !== true) out = out.reverse();

  return out;
};
