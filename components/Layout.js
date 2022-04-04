import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Next Amazon</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>amazon</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>&copy; Copyright {new Date().getFullYear()} | Next Amazon Inc.</footer>
    </div>
  );
}

export default Layout;
