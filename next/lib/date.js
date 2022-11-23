export const compareDates = (aDateStr, bDateStr) =>
  new Date(aDateStr) - new Date(bDateStr);

export const formatDate = (dateStr, options = {}) =>
  new Date(dateStr).toLocaleDateString("en-us", options);

export const formatAsMonthDate = (dateStr) =>
  formatDate(dateStr, {
    month: "long",
    year: "numeric",
  });

export const formatAsLongDate = (dateStr) =>
  formatDate(dateStr, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
