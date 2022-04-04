import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

import useStyles from '../utils/styles';

function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Next Amazon</title>
      </Head>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <Typography>amazon</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        &copy; Copyright {new Date().getFullYear()} | Next Amazon Inc.
      </footer>
    </div>
  );
}

export default Layout;
