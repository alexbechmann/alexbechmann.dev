import React from "react";
import { makeStyles } from "@material-ui/core";

export interface NotesPageProps {}

const useStyles = makeStyles((theme) => ({}));

export function NotesPage(props: NotesPageProps) {
  const classes = useStyles(props);
  const {} = props;
  return <div>index</div>;
}

export default NotesPage;
