// @ts-check

import { defineConfig } from "tinacms";
import { postNodeToFilename } from "../lib/posts";

// Your hosting provider likely exposes this as an environment variable
// @ts-expect-error
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "da71b4f0-f7e9-4f0d-ba35-9a2829279683", // Get this from tina.io
  token: "c7fe6929692ef8e039ffc73f01b8384993ea6ea6", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "HH:mm:ss",
              format: (value) => {
                const date = value ? new Date(value) : new Date();

                const year = date.toLocaleDateString("en-US", {
                  year: "numeric",
                });
                const month = date.toLocaleDateString("en-US", {
                  month: "2-digit",
                });
                const day = date.toLocaleDateString("en-US", {
                  day: "2-digit",
                });
                const time = date.toLocaleTimeString("en-US", {
                  hourCycle: "h23",
                });

                return [year, month, day].join("-") + " " + time;
              },
            },
          },
          {
            type: "image",
            name: "image",
            label: "Hero Image",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // router: ({ document }) => {
          //   console.log("document is", document);
          //   return `/blog/${document._sys.filename}`;
          // },
          filename: {
            readonly: true,
            slugify: postNodeToFilename,
          },
        },
      },
      {
        name: "project",
        label: "Project Pages",
        path: "projects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: { dateFormat: "YYYY/MM" },
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "photo",
            label: "Hero Image",
          },
          {
            type: "string",
            name: "photo_alt",
            nameOverride: "photo-alt",
            label: "Hero Image Alternative Text",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            ui: { component: "tags" },
          },
          {
            type: "string",
            name: "username",
            label: "GitHub Username",
            description:
              "The username of the GitHub account for the repository.",
          },
          {
            type: "string",
            name: "repo",
            label: "GitHub Repository Name",
            description: "The name of the GitHub repository.",
          },
          {
            type: "boolean",
            name: "issues",
            label: "Show GitHub Issues",
            description: "Controls whether link to GitHub issues is displayed.",
          },
          {
            type: "boolean",
            name: "wiki",
            label: "Show GitHub Wiki",
            description: "Controls whether link to GitHub wiki is displayed.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // router: ({ document }) => {
          //   console.log("project document is", document);
          //   return `/projects/${document._sys.filename}`;
          // },
          filename: {
            readonly: true,
            slugify: (values) => {
              const title = values.title ? values.title : "untitled";
              return title
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9 ]/g, "")
                .split(" ")
                .filter((value) => value.length > 0)
                .join("-");
            },
          },
        },
      },
    ],
  },
});
