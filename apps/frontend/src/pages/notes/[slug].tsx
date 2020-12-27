import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import { getNoteDocument } from "../../notes/notes-service";
import { Note } from "../../notes/note";
import fs from "fs";
import path from "path";
import { MDXProvider } from "@mdx-js/react";
import { Code } from "../../components/md/Code";

export interface NotePageProps {
  note: Note;
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const H1 = (props) => <h1 style={{ color: "tomato" }} {...props} />;

export function NotePage(props: NotePageProps) {
  const classes = useStyles(props);
  const { note } = props;
  const Document = getNoteDocument(`${note.slug}.md`).default;
  return (
    <Layout>
      <Container className={classes.root} maxWidth="md">
        <MDXProvider components={{ h1: H1, code: Code }}>
          <Document />
        </MDXProvider>
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
    const { attributes } = getNoteDocument(documentPath);

    return {
      title: attributes.title,
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
    const { attributes } = getNoteDocument(documentPath);
    return {
      title: attributes.title,
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
