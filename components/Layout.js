import {
  AppBar,
  Badge,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;

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
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#FFD814',
      },
      secondary: {
        main: '#FFA41C',
      },
    },
  });

  const classes = useStyles();

  const handleDarkModeToggle = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const colorMode = !darkMode;
    Cookies.set('darkMode', colorMode ? 'ON' : 'OFF');
  };

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
                <Image src="/images/brand.png" alt="logo" width="110" height="33"></Image>
              </Link>
            </NextLink>

            <div className={classes.grow}></div>

            <div>
              <Switch checked={darkMode} onChange={() => handleDarkModeToggle()}></Switch>
            </div>

            <div>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
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
