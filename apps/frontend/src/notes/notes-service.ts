import React from "react";
import LernaDocument, { frontMatter, tableOfContents } from "./lerna.md";
import type { Note } from "./note";

export const notes: Note[] = [
  {
    title: "Lerna",
    slug: "lerna",
  },
];

export function getNoteDocument(slug: typeof notes[number]["slug"]): React.ComponentType {
  switch (slug) {
    case "lerna": {
      return LernaDocument;
    }

    default: {
      return React.Fragment;
    }
  }
}
