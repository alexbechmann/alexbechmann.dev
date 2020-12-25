import React from "react";
import { NoteSlug } from "./note-slug";
import type { Note } from "./note";
import type { FrontMatter } from "./frontmatter";

export const notes: Note[] = Object.values(NoteSlug)
  .filter((x) => typeof x === "string")
  .map((slug: string) => {
    const doc = getNoteDocument(slug);
    const title = doc.frontMatter.title;
    return {
      title,
      slug: slug,
    };
  });

export function getNoteDocument(slug: string): { default: React.ComponentType; frontMatter: FrontMatter } {
  return require(`./${slug}.md`);
}
