import React from 'react';
import { makeStyles, mergeClasses } from '@material-ui/styles';
import { Theme, AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import CodeIcon from '@material-ui/icons/Code';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#dedede'
  },
  '@global body': {
    paddingBottom: 86
  }
}));

const Footer = () => {
  const classes = useStyles({});
  return (
    <AppBar color="inherit" className={classes.appBar} position="fixed">
      <Toolbar>
        <Tooltip title="Send me an email">
          <IconButton href="mailto:alex.bechmann@outlook.com">
            <EmailIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton href="https://github.com/alexbechmann/cv">
            <CodeIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;