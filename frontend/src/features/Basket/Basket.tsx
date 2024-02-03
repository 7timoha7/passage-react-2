import React, { useEffect, useState } from 'react';
import {
  Badge,
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { v4 as uuidv4 } from 'uuid';
import { createBasket, fetchBasket, updateBasket } from './basketThunks';
import { selectBasket, selectBasketUpdateLoading } from './basketSlice';
import { BasketTypeOnServerMutation } from '../../types';
import { selectUser } from '../users/usersSlice';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const Basket = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [stateBasket, setStateBasket] = useState<BasketTypeOnServerMutation | null>(null);
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const addBasketLoading = useAppSelector(selectBasketUpdateLoading);

  const loadingBasket = () => {
    return !!addBasketLoading;
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    let storedBasketId = localStorage.getItem('sessionKey');
    if (storedBasketId) {
      dispatch(createBasket({ sessionKey: storedBasketId }));
    }
    if (!storedBasketId) {
      storedBasketId = uuidv4();
      localStorage.setItem('sessionKey', storedBasketId);
    }
  }, [user, dispatch]);

  useEffect(() => {
    setStateBasket(basket);
  }, [basket]);

  useEffect(() => {
    if (user) {
      dispatch(fetchBasket('1'));
    }
    const storedBasketId = localStorage.getItem('sessionKey');
    if (storedBasketId) {
      dispatch(fetchBasket(storedBasketId));
    }
  }, [dispatch, user]);

  const handleUpdateBasket = async (product_id: string, action: 'increase' | 'decrease' | 'remove') => {
    if (user) {
      await dispatch(updateBasket({ sessionKey: user._id, product_id, action }));
      await dispatch(fetchBasket(user._id));
    } else if (stateBasket?.session_key) {
      await dispatch(updateBasket({ sessionKey: stateBasket.session_key, product_id, action }));
      await dispatch(fetchBasket(stateBasket.session_key));
    }
  };

  const clearBasket = async (action: 'clear') => {
    if (stateBasket?.session_key) {
      await dispatch(updateBasket({ action: action, sessionKey: stateBasket.session_key, product_id: action }));
      await dispatch(fetchBasket(stateBasket.session_key));
      setAnchorEl(null);
    } else if (user) {
      await dispatch(updateBasket({ action: action, sessionKey: user._id, product_id: action }));
      await dispatch(fetchBasket(user._id));
      setAnchorEl(null);
    }
  };

  const navigateToFullBasket = async () => {
    navigate('/basket');
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="Корзина" color="inherit" onClick={handlePopoverOpen}>
        <Badge badgeContent={stateBasket?.items.length || 0} color="error">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <TableContainer>
          <Table>
            <TableBody>
              {stateBasket?.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1">{item.product.name}</Typography>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      disabled={addBasketLoading === item.product.goodID}
                      color="primary"
                      style={{ color: 'red' }} // ваш цвет для кнопок +
                      onClick={() => handleUpdateBasket(item.product.goodID, 'increase')}
                    >
                      {addBasketLoading === item.product.goodID ? (
                        <CircularProgress size={'23px'} color="error" />
                      ) : (
                        <AddCircleOutlineIcon />
                      )}
                    </IconButton>
                    <IconButton
                      disabled={addBasketLoading === item.product.goodID}
                      color="primary"
                      style={{ color: 'black' }} // ваш цвет для кнопок -
                      onClick={() =>
                        item.quantity === 1
                          ? handleUpdateBasket(item.product.goodID, 'remove')
                          : handleUpdateBasket(item.product.goodID, 'decrease')
                      }
                    >
                      {addBasketLoading === item.product.goodID ? (
                        <CircularProgress size={'23px'} color="error" />
                      ) : (
                        <RemoveCircleOutlineIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{`${item.product.price * item.quantity} сом`}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <ListItem>
          <Typography variant="subtitle1">Общая сумма: {stateBasket?.totalPrice} сом</Typography>
        </ListItem>
        <Divider />
        <Grid container spacing={2} sx={{ p: 1 }}>
          <Grid item>
            <LoadingButton
              loading={loadingBasket()}
              onClick={() => navigateToFullBasket()}
              variant="outlined"
              color="error"
            >
              Перейти в корзину
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              loading={loadingBasket()}
              disabled={stateBasket?.items.length === 0}
              onClick={() => clearBasket('clear')}
              variant="text"
              color="error"
            >
              Очистить корзину
            </LoadingButton>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export default Basket;
