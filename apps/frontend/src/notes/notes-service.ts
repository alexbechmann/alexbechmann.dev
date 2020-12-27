import React from "react";
import type { FrontMatter } from "./frontmatter";
import { Note } from "./note";
import fs from "fs";
import path from "path";

export function getNoteDocument(fileName: string): { default: React.ComponentType; attributes: FrontMatter } {
  return require(`./documents/${fileName}`);
}

// export function getAllNotes() {
//   const documentsDir = path.resolve(process.cwd(), "src/notes/documents");
//   const documentPaths = fs.readdirSync(documentsDir);
//   const notes: Note[] = documentPaths.map((documentPath) => {
//     const { attributes } = getNoteDocument(documentPath);
//     return {
//       title: attributes.title,
//       slug: documentPath.split(".")[0],
//     };
//   });
//   return notes;
// }
