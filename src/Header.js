import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles/HeaderStyles';

function Header({ classes }) {
  return <div className={classes.Header}>Innovile Config Management App</div>;
}

export default withStyles(styles)(Header);
