import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { NotesPageProps } from ".";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import { notes, getNoteDocument } from "../../notes/notes-service";
import { Note } from "../../notes/note";

export interface NotePageProps {
  note: Note;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& pre": {
      background: "#232323",
      padding: theme.spacing(2),
      borderRadius: 3,
    },
  },
}));

export function NotePage(props: NotePageProps) {
  const classes = useStyles(props);
  const { note } = props;
  const Document = getNoteDocument(note.slug);
  return (
    <Layout>
      <Container className={classes.root} maxWidth="md">
        <Document />
      </Container>
    </Layout>
  );
}

export default NotePage;

const data = {
  "test/asdf": { title: "page is 3" },
};

interface NotePageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<NotePageParams> = async () => {
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

export const getStaticProps: GetStaticProps<NotesPageProps, NotePageParams> = async ({ params }) => {
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
