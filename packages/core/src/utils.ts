export const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

export const isNodeJs =
  typeof process !== "undefined" &&
  process.release !== null &&
  process.release.name === "node";
