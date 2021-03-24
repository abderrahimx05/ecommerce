import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Typography variant="h6">AB company</Typography>
    </div>
  );
};

export default Footer;
