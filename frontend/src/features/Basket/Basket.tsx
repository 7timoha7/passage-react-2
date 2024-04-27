import React, { useEffect } from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createBasket, fetchBasket } from './basketThunks';
import { selectBasket } from './basketSlice';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Basket = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(createBasket({}));
    }
    let storedBasketId = localStorage.getItem('sessionKey');

    if (!storedBasketId) {
      storedBasketId = uuidv4();
      localStorage.setItem('sessionKey', storedBasketId);
      dispatch(createBasket({ sessionKey: storedBasketId }));
    } else if (storedBasketId) {
      dispatch(fetchBasket(storedBasketId));
    }
  }, [user, dispatch]);

  return (
    <>
      <IconButton
        aria-label="Корзина"
        color="inherit"
        onClick={() => navigate('/basket')}
        sx={{
          background: '#404040',
          '&:hover': {
            background: '#7c7c7c',
          },
        }}
      >
        <Badge badgeContent={basket?.items?.length || 0} color="error">
          <ShoppingCartIcon
            sx={{
              color: '#ffffff',
              '&:hover': {
                color: '#e8b86d',
              },
            }}
            fontSize="large"
          />
        </Badge>
      </IconButton>
    </>
  );
};

export default Basket;
