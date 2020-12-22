import React from "react";
import { makeStyles } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { NotesPageProps } from ".";
import { ParsedUrlQuery } from "querystring";

export interface NotePageProps {
  content: any;
}

const useStyles = makeStyles((theme) => ({}));

export function NotePage(props: NotePageProps) {
  const classes = useStyles(props);
  const {} = props;
  return <div>{JSON.stringify(props)}</div>;
}

export default NotePage;

const data = {
  "test/asdf": { title: "page is 3" },
};

interface Params extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [
      {
        params: {
          slug: ["test", "asdf"],
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NotesPageProps, Params> = async ({
  params,
}) => {
  const slugChunks: string[] = params.slug as string[];
  const slug = slugChunks.join("/");
  console.log({ slug });
  const content = data[slug];
  if (!content) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      content,
    },
  };
};
