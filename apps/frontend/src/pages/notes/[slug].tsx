import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import { getNoteDocument } from "../../notes/notes-service";
import { Note } from "../../notes/note";
import fs from "fs";
import path from "path";

export interface NotePageProps {
  note: Note;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& pre": {
      background: "#101010",
      padding: theme.spacing(2),
      borderRadius: 3,
    },
  },
}));

export function NotePage(props: NotePageProps) {
  const classes = useStyles(props);
  const { note } = props;
  const Document = getNoteDocument(`${note.slug}.md`).default;
  return (
    <Layout>
      <Container className={classes.root} maxWidth="md">
        <Document />
      </Container>
    </Layout>
  );
}

export default NotePage;

interface NotePageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<NotePageParams> = async () => {
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
    paths: notes.map((note) => {
      return {
        params: {
          slug: note.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NotePageProps, NotePageParams> = async ({ params }) => {
  const documentsDir = path.resolve(process.cwd(), "src/notes/documents");
  const documentPaths = fs.readdirSync(documentsDir);
  const notes: Note[] = documentPaths.map((documentPath) => {
    const { frontMatter } = getNoteDocument(documentPath);
    return {
      title: frontMatter.title,
      slug: documentPath.split(".")[0],
    };
  });
  const note = notes.find((note) => note.slug === params.slug);
  if (!note) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      note,
    },
  };
};
