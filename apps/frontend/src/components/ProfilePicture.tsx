import React, { useState } from "react";
import { makeStyles, Avatar } from "@material-ui/core";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  profile: {},
  avatar: {
    border: `3px solid ${theme.palette.primary.dark}`,
    marginRight: theme.spacing(),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  config: {
    duration: 500,
  },
}));

function ProfilePicture(props: any) {
  const classes = useStyles(props);
  const [active, setActive] = useState(false);
  return (
    <motion.div
      animate={{ scale: active ? 1.2 : 1, rotate: active ? 10 : 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Avatar
        onMouseEnter={setActive.bind(this, true)}
        onMouseLeave={setActive.bind(this, false)}
        className={classes.avatar}
        src="/me.jpg"
      />
    </motion.div>
  );
}

export default ProfilePicture;
