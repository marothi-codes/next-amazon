import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import Link from 'next/link';
import NextLink from 'next/link';
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
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>amazon</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
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
