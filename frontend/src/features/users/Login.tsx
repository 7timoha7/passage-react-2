import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError, selectLoginLoading } from './usersSlice';
import { login } from './usersThunks';
import { Alert, Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import type { LoginMutation } from '../../types';
import 'react-phone-input-2/lib/style.css';
import RestorePassword from './components/RestorePassword';

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  // const googleLoginHandler = async (credentials: string) => {
  //   await dispatch(googleLogin(credentials)).unwrap();
  //   await navigate('/');
  // };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: '25px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.57)',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#ddbe86' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography color={'white'} component="h1" variant="h5">
          Войти
        </Typography>
        {/*<Box sx={{ pt: 2 }}>*/}
        {/*  <GoogleLogin*/}
        {/*    onSuccess={(credentialResponse) => {*/}
        {/*      if (credentialResponse.credential) {*/}
        {/*        void googleLoginHandler(credentialResponse.credential);*/}
        {/*      }*/}
        {/*    }}*/}
        {/*    onError={() => {*/}
        {/*      console.log('Login failed');*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Box>*/}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error && error.error === 'Email incorrect' && (
                <Alert severity="error" sx={{ mt: 1, width: '100%' }}>
                  {'Не верный Email'}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={'Email'}
                name="email"
                type="email"
                autoComplete="current-email"
                value={state.email}
                onChange={inputChangeHandler}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              {error && error.error === 'Password incorrect' && (
                <Alert severity="error" sx={{ mt: 1, width: '100%' }}>
                  {'Не верный пароль'}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={'Пароль'}
                name="password"
                type="password"
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <RestorePassword />
            </Grid>
          </Grid>
          <LoadingButton
            color="primary"
            type="submit"
            loading={loading}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#ddbe86', // Цвет кнопки
              '&:hover': {
                backgroundColor: '#ab944d', // Цвет кнопки при наведении
              },
            }}
          >
            {'Войти'}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                sx={{
                  color: '#ddbe86',
                  '&:hover': {
                    color: '#ab944d', // Цвет кнопки при наведении
                  },
                  textDecoration: 'none',
                }}
                component={RouterLink}
                to="/register"
                variant="body2"
              >
                {'Регистрация'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
