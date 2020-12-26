import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import GitHub from "./icons/GitHub";
import { Theme, IconButton, Avatar, Tooltip, NoSsr, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProfilePicture from "./ProfilePicture";
import { useScrollDirection } from "../hooks/use-scroll-position";
import { motion } from "framer-motion";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  motion: {
    position: "fixed",
    zIndex: theme.zIndex.appBar,
    right: 0,
    left: 0,
  },
  appBarRoot: {
    // backgroundColor: "#333",
  },
}));

const Header = () => {
  const classes = useStyles({});
  const scrollDirection = useScrollDirection();
  return (
    <div>
      <motion.div
        className={classes.motion}
        animate={{ y: scrollDirection === "down" ? -64 : 0 }}
        transition={{
          type: "tween",
        }}
      >
        <AppBar color="primary" position="relative" elevation={0} classes={{ root: classes.appBarRoot }}>
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <Link href="/">
                <a>
                  <ProfilePicture />
                </a>
              </Link>
              <Link href="/">
                <a style={{ color: "inherit", textDecoration: "none" }}>
                  <Typography variant="h6" color="inherit">
                    alex.bechmann.dev
                  </Typography>
                </a>
              </Link>
              <div className={classes.grow} />
              <Link href="/notes">
                <Button color="inherit">Code library</Button>
              </Link>
              <Tooltip title="Browse some of my projects on GitHub">
                <IconButton color="inherit" href="https://github.com/alexbechmann">
                  <GitHub />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>
    </div>
  );
};

export default Header;
