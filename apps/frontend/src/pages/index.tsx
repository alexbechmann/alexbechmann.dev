import React, { useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Layout from "../components/Layout";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CssBaseline,
  Link,
} from "@material-ui/core";
import GraphQL from "../components/icons/GraphQL";
import Experience from "../components/Experience";
import { skills } from "../info/skills";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const Index = () => {
  const classes = useStyles({});
  return (
    <Layout>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>
              About
            </Typography>
            <Typography paragraph>
              My name is Alex Bechmann, a 27 year old full-stack web developer
              from Silkeborg. I grew up in Suffolk, United Kingdom and moved to
              Denmark in 2010 to study for a Bachelor degree in Web Development.
            </Typography>
            <Typography paragraph>
              I have a passion for writing clean, easily understood and well
              architectured code on both front and back-end environments. I work
              hard to keep up to date with industry trends, and continuously
              look for ways to improve my skills as a developer.
            </Typography>
            <Typography paragraph>
              I am equally comfortable collaborating with others in a team, as I
              am working solo on projects.
            </Typography>
            <Typography paragraph>
              My native language is English, and I also speak Danish fluently.
            </Typography>
            <Typography paragraph>
              Outside of work I love to swim, play music, learn new coding
              skills by working on side projects & spend time with my family!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom>
              Technical skills include
            </Typography>
            <List dense disablePadding>
              {skills.map(({ name, iconElement, color }, index) => {
                const [
                  initialAnimationEnded,
                  setInitialAnimationEnded,
                ] = useState(false);
                const [hasMouseOver, setHasMouseOver] = useState(false);
                const delay = initialAnimationEnded ? 0 : index * 0.1;
                return (
                  <motion.div
                    style={{ x: -50, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      rotate: hasMouseOver ? 4 : 0,
                    }}
                    transition={{
                      type: "spring",
                      delay,
                    }}
                    onMouseEnter={() => {
                      setHasMouseOver(true);
                      setInitialAnimationEnded(true);
                    }}
                    onMouseLeave={() => setHasMouseOver(false)}
                  >
                    <ListItem disableGutters key={name}>
                      <ListItemIcon>{iconElement({ color })}</ListItemIcon>
                      <ListItemText style={{ color }} primary={name} />
                    </ListItem>
                  </motion.div>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Index;
