import React, { useContext, useEffect, useState } from 'react';
import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Layout from '../components/Layout';

function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const classes = useStyles();

  useEffect(() => {
    if (userInfo) router.push('/');
  }, [router, userInfo]);

  // State data.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationPassword, setVerificationPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== verificationPassword) {
      alert('Passwords do not match.');
      return; // Terminate the function.
    }
    try {
      const { data } = await axios.get('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout title="Register">
      <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          {/* Name Field */}
          <ListItem>
            <TextField
              variant="standard"
              fullWidth
              id="name"
              label="Name"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}></TextField>
          </ListItem>

          {/* Email Field */}
          <ListItem>
            <TextField
              variant="standard"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}></TextField>
          </ListItem>

          {/* Password Field */}
          <ListItem>
            <TextField
              name="password"
              id="password"
              label="Password"
              variant="standard"
              fullWidth
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}></TextField>
          </ListItem>

          {/* Verification Password Field */}
          <ListItem>
            <TextField
              name="verificationPassword"
              id="verificationPassword"
              label="Verify Password"
              variant="standard"
              fullWidth
              inputProps={{ type: 'password' }}
              onChange={(e) => setVerificationPassword(e.target.value)}></TextField>
          </ListItem>

          {/* Submit Button */}
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>

          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default Register;
