import React from "react";
import { Container, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import Layout from "../../components/Layout";
import { notes } from "../../notes/notes-service";
import Link from "next/link";

export interface NotesPageProps {}

const useStyles = makeStyles((theme) => ({}));

export function NotesPage(props: NotesPageProps) {
  const classes = useStyles(props);
  const {} = props;
  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h5">Notes</Typography>
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
