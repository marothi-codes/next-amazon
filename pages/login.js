import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';

function Login() {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) router.push('/');
  }, [router, userInfo]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/users/login`, {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data : err.message);
    }
  };

  return (
    <Layout title="Login">
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>

        <List>
          {/* Email Field */}
          <ListItem>
            <TextField
              variant="standard"
              fullWidth
              id="email"
              label="Email:"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}></TextField>
          </ListItem>

          {/* Password Field */}
          <ListItem>
            <TextField
              variant="standard"
              fullWidth
              id="password"
              label="password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}></TextField>
          </ListItem>

          {/* Submit Button */}
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default Login;
