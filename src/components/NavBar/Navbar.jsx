import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import classes from "*.module.css";
function Navbar() {
  return (
    <>
      <AppBar position="fixed" className={classes.AppBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src=""
              alt="commerce.js"
              height="25px"
              className={classes.image}
            />
            commerce.js
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
