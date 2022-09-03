import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { filterMatterResult } from "./markdown";

const projectsDirectory = path.join(process.cwd(), "projects");

// It might be nice to include month and year in these filenames soem day.
const projectNameFormat = /^([a-z0-9]+(-[a-z0-9]+)*).md$/;

/**
 * parseProjectSlug uses regular expressions to parse the slug out of a
 * project's filename.
 *
 * @param {String} name the filename of the project (no leading path).
 *
 * @returns {string} the unique slug for this project.
 */
const parseProjectSlug = (name) => {
  const match = projectNameFormat.exec(name);
  if (!match) {
    throw new Error(`project name does not match format: '${name}'`);
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
const projectSlugToFilePath = (slug) =>
  path.join(projectsDirectory, `${slug}.md`);

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
export const getAllProjectPaths = () => {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => ({
    params: { slug: parseProjectSlug(fileName) },
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
export const getProjectMetadata = (slug) => {
  const href = projectSlugToHref(slug);
  const filePath = projectSlugToFilePath(slug);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const matterResult = matter(fileContents);
  const filteredMatterResult = filterMatterResult(matterResult);

  filteredMatterResult.frontMatter.date =
    filteredMatterResult.frontMatter.date.toString();

  return {
    slug,
    filePath,
    href,

    ...filteredMatterResult,
  };
};

/**
 * getAllProjectMetadata retrieves the project metadata for all projects.
 *
 * @returns {[]Object} the metadata for all known projects.
 */
export const getAllProjectMetadata = () => {
  const fileNames = fs.readdirSync(projectsDirectory);
  // const data = fileNames.map(getProjectMetadata);
  const data = fileNames.map((fileName) => {
    const slug = parseProjectSlug(fileName);
    return getProjectMetadata(slug);
  });
  return data;
};
