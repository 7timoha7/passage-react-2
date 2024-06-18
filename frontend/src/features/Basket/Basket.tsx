import React, { useEffect } from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createBasket, fetchBasket } from './basketThunks';
import { selectBasket } from './basketSlice';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toolbarTobAndBottomColor } from '../../styles';

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
          background: toolbarTobAndBottomColor,
          '&:hover': {
            background: 'rgba(90,30,30,0.67)',
          },
        }}
      >
        <Badge badgeContent={basket?.items?.length || 0} color="error">
          <ShoppingCartIcon
            sx={{
              color: '#ffffff',
            }}
            fontSize="large"
          />
        </Badge>
      </IconButton>
    </>
  );
};

export default Basket;
