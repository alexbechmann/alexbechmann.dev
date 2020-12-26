import React from "react";
import type { FrontMatter } from "./frontmatter";

export function getNoteDocument(fileName: string): { default: React.ComponentType; frontMatter: FrontMatter } {
  return require(`./documents/${fileName}`);
}
