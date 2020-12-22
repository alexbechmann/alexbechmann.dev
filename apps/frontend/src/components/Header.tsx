import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import GitHub from "./icons/GitHub";
import { Theme, IconButton, Avatar, Tooltip, NoSsr } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProfilePicture from "./ProfilePicture";
import Typist from "react-typist";
import { useScrollDirection } from "../hooks/use-scroll-position";
import { motion } from "framer-motion";

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
        <AppBar position="relative">
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <ProfilePicture />
              <Typography variant="h6" color="inherit">
                {/* <Typist
                  startDelay={2500}
                  avgTypingDelay={100}
                  stdTypingDelay={50}
                  cursor={{ hideWhenDone: true, hideWhenDoneDelay: 2000 }}
                > */}
                Alex Bechmann (Web Developer)
                {/* </Typist> */}
              </Typography>
              <div className={classes.grow} />
              <Tooltip title="Browse some of my projects on GitHub">
                <IconButton
                  color="inherit"
                  href="https://github.com/alexbechmann"
                >
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
