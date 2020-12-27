import React from "react";
import { makeStyles } from "@material-ui/core";

export interface CodeProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#101010",
    padding: theme.spacing(2),
    borderRadius: 3,
    overflowX: "scroll",
  },
}));

export function Code(props: React.PropsWithChildren<CodeProps>) {
  const classes = useStyles(props);
  const {} = props;
  return <div className={classes.root}>{props.children}</div>;
}
