import React from "react";
import { Container, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Note } from "../../notes/note";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import { getNoteDocument } from "../../notes/notes-service";

export interface NotesPageProps {
  notes: Note[];
}

const useStyles = makeStyles((theme) => ({}));

export function NotesPage(props: NotesPageProps) {
  const classes = useStyles(props);
  const { notes } = props;
  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h5">Code Library</Typography>
        <List>
          {notes.map((note) => {
            return (
              <Link href={`/notes/${note.slug}`} passHref>
                <ListItem button component="a">
                  <ListItemText primary={note.title} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Container>
    </Layout>
  );
}

export default NotesPage;

export const getStaticProps: GetStaticProps<NotesPageProps> = async () => {
  const documentsDir = path.resolve(process.cwd(), "src/notes/documents");
  const documentPaths = fs.readdirSync(documentsDir);
  const notes: Note[] = documentPaths.map((documentPath) => {
    const { frontMatter } = getNoteDocument(documentPath);
    return {
      title: frontMatter.title,
      slug: documentPath.split(".")[0],
    };
  });
  return {
    props: {
      notes,
    },
  };
};
