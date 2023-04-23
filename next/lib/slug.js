export const slugifyTitle = (title) =>
  (title ? title : "untitled")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .filter((value) => value.length > 0)
    .join("-");
