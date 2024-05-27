import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import { register } from './usersThunks';
import { Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import type { RegisterMutation } from '../../types';
import { MuiTelInput } from 'mui-tel-input';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const phoneChangeHandler = (newPhone: string) => {
    setState((prevState) => ({ ...prevState, phoneNumber: newPhone }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      await navigate('/');
      await window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return '';
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        style={{
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography color={'white'} component="h1" variant="h5">
          {'Регистрация'}
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={'Email'}
                name="email"
                autoComplete="new-email"
                type="email"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={'Пароль'}
                name="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={'Имя'}
                name="firstName"
                autoComplete="new-firstName"
                value={state.firstName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('firstName'))}
                helperText={getFieldError('firstName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={'Фамилия'}
                name="lastName"
                autoComplete="new-lastName"
                value={state.lastName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('lastName'))}
                helperText={getFieldError('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTelInput
                label={'Номер телефона'}
                onChange={phoneChangeHandler}
                defaultCountry={'KG'}
                name="phoneNumber"
                error={Boolean(getFieldError('phoneNumber'))}
                helperText={getFieldError('phoneNumber')}
                value={state.phoneNumber}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            loading={loading}
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#ddbe86', // Цвет кнопки
              '&:hover': {
                backgroundColor: '#ab944d', // Цвет кнопки при наведении
              },
            }}
          >
            {'Регистрация'}
          </LoadingButton>
          <Grid container justifyContent="flex-end" mt={2}>
            <Grid item>
              <Link
                sx={{
                  textDecoration: 'none',
                  color: '#ddbe86',
                  '&:hover': {
                    color: '#ab944d', // Цвет кнопки при наведении
                  },
                }}
                component={RouterLink}
                to="/login"
                variant="body2"
              >
                {'Войти'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
