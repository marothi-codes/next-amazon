import React, { useContext, useEffect } from 'react';
import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Layout from '../components/Layout';

function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    if (userInfo) router.push('/');
  }, [router, userInfo]);

  const handleFormSubmit = async ({ name, email, password, verificationPassword }) => {
    closeSnackbar();
    if (password !== verificationPassword) {
      enqueueSnackbar("Passwords don't match.", { variant: 'error' });
      return; // Terminate the function.
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Layout title="Register">
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          {/* Name Field */}
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is more than 1'
                        : 'Name is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          {/* Email Field */}
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          {/* Password Field */}
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          {/* Verification Password Field */}
          <ListItem>
            <Controller
              name="verificationPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  fullWidth
                  id="verificationPassword"
                  label="Verify Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.verificationPassword)}
                  helperText={
                    errors.verificationPassword
                      ? errors.verificationPassword.type === 'minLength'
                        ? 'Confirm Password length is more than 5'
                        : 'Confirm  Password is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
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
