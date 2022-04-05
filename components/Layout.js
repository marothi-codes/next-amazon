import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import useStyles from '../utils/styles';

function Layout({ title, description, children }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1 rem 0',
      },
    },
    palette: {
      type: 'light',
      primary: {
        main: '#e47911',
      },
      secondary: {
        main: '#cccccc',
      },
    },
  });
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazon` : 'Next Amazon'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </div>
  );
}

export default Layout;
