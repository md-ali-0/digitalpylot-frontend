/**
 * Generates a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A formatted slug string
 */
export const generateSlug = (text: string): string => {
  if (!text) return "";

  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export default generateSlug;
