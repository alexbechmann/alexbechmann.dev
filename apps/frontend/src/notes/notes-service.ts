import React from "react";
import LernaDocument from "./lerna.md";
import IngressDocument from "./ingress.md";
import type { Note, NoteSlug } from "./note";

export const notes: Note[] = [
  {
    title: "Nginx Ingress YAML",
    slug: "nginx-ingress-yaml",
  },
  {
    title: "Lerna",
    slug: "lerna",
  },
];

export function getNoteDocument(slug: NoteSlug): React.ComponentType {
  switch (slug) {
    case "lerna": {
      return LernaDocument;
    }
    case "nginx-ingress-yaml": {
      return IngressDocument;
    }

    default: {
      return React.Fragment;
    }
  }
}
