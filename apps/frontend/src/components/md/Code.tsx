import React from "react";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";

export interface CodeProps {
  className: string;
}

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
  const { children, className } = props;
  return <pre className={classNames(classes.root, className)}>{children}</pre>;
}
