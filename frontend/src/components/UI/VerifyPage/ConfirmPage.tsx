import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { reAuthorization, verify } from '../../../features/users/usersThunks';
import { Button, Container, Paper, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';

const ConfirmPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToCabinet = useCallback(async () => {
    await dispatch(reAuthorization());
    navigate('/my-cabinet');
  }, [dispatch, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(verify(token));
    }
    setTimeout(navigateToCabinet, 5000);
  }, [dispatch, token, navigateToCabinet]);
  return (
    <Container>
      <Paper sx={{ m: 2, p: 2 }}>
        <Typography sx={{ display: 'inline-block' }} variant="h5">
          {'Вы будете автоматически переведены в свой кабинет через 5 сек. . .  или вы можете перейти самостоятельно :'}
        </Typography>{' '}
        <Button
          onClick={navigateToCabinet}
          variant="text"
          color="primary"
          sx={{
            mt: 2,
            color: '#e39912', // Цвет контура кнопки
            borderColor: '#e39912', // Цвет контура кнопки

            '&:hover': {
              borderColor: '#756433', // Цвет контура кнопки при наведении
              color: '#756433', // Цвет контура кнопки
            },
          }}
        >
          {'перейти'}
        </Button>
      </Paper>
    </Container>
  );
};

export default ConfirmPage;
