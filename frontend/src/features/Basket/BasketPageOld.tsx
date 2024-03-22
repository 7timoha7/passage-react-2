import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Spinner from '../../components/UI/Spinner/Spinner';
import { LoadingButton } from '@mui/lab';
import { selectBasket, selectBasketOneLoading, selectBasketUpdateLoading } from './basketSlice';
import { fetchBasket, updateBasket } from './basketThunks';
import { selectUser } from '../users/usersSlice';

const BasketPageOld = () => {
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const addBasketLoading = useAppSelector(selectBasketUpdateLoading);
  const oneBasketLoading = useAppSelector(selectBasketOneLoading);
  const [showOrderField, setShowOrderField] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState('');

  const loadingBasket = () => {
    return !!addBasketLoading;
  };

  const handleUpdateBasket = async (
    product_id: string,
    action: 'increaseToOrder' | 'decreaseToOrder' | 'increase' | 'decrease' | 'remove',
  ) => {
    if (user) {
      await dispatch(updateBasket({ sessionKey: user._id, product_id, action }));
      await dispatch(fetchBasket(user._id));
    } else if (basket?.session_key) {
      await dispatch(updateBasket({ sessionKey: basket.session_key, product_id, action }));
      await dispatch(fetchBasket(basket.session_key));
    }
  };

  const clearBasket = async (action: 'clear') => {
    if (basket?.session_key) {
      await dispatch(updateBasket({ action: action, sessionKey: basket.session_key, product_id: action }));
      await dispatch(fetchBasket(basket.session_key));
    } else if (user) {
      await dispatch(updateBasket({ action: action, sessionKey: user._id, product_id: action }));
      await dispatch(fetchBasket(user._id));
    }
  };

  const handleShowOrderField = (productID: string) => {
    setSelectedProductID(productID);
    setShowOrderField(true);
  };

  const handleHideOrderField = () => {
    setSelectedProductID('');
    setShowOrderField(false);
  };

  const isAddButtonDisabled = (goodID: string) => {
    if (!basket || !basket.items || basket.items.length === 0) {
      return false;
    }

    const item = basket.items.find((item) => item.product.goodID === goodID);

    if (!item || !item.product.quantity) {
      return false;
    }

    const stockQuantities = item.product.quantity.map((quantityItem) => quantityItem.quantity);
    const totalStockQuantity = stockQuantities.reduce((total, quantity) => total + quantity, 0);

    return item.quantity >= totalStockQuantity;
  };

  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        Корзина
      </Typography>
      {oneBasketLoading ? (
        <Spinner />
      ) : (
        <>
          {basket?.items ? (
            <>
              <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table>
                  <TableBody>
                    {basket.items.map((item, index) => (
                      <TableRow key={item.product.goodID + index}>
                        <TableCell
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate('/product/' + item.product._id)}
                        >
                          {item.product.name}
                        </TableCell>
                        {isAddButtonDisabled(item.product.goodID) && !showOrderField && (
                          <TableCell align="center">
                            <Button variant="outlined" onClick={() => handleShowOrderField(item.product.goodID)}>
                              Под заказ
                            </Button>
                          </TableCell>
                        )}
                        {showOrderField &&
                          selectedProductID === item.product.goodID &&
                          isAddButtonDisabled(item.product.goodID) && (
                            <TableCell align="center">
                              <IconButton
                                disabled={addBasketLoading === item.product.goodID}
                                onClick={() => handleUpdateBasket(item.product.goodID, 'increaseToOrder')}
                                color="success"
                              >
                                {addBasketLoading === item.product.goodID ? (
                                  <CircularProgress size={'20px'} color="error" />
                                ) : (
                                  <AddCircleOutlineIcon />
                                )}
                              </IconButton>
                              <span>{item.quantityToOrder}</span>
                              <IconButton
                                onClick={() => handleUpdateBasket(item.product.goodID, 'decreaseToOrder')}
                                color="primary"
                                disabled={addBasketLoading === item.product.goodID || item.quantityToOrder === 0}
                              >
                                {addBasketLoading === item.product.goodID ? (
                                  <CircularProgress size={'20px'} color="error" />
                                ) : (
                                  <RemoveCircleOutlineIcon
                                    style={item.quantityToOrder > 0 ? { color: 'black' } : undefined}
                                  />
                                )}
                              </IconButton>
                            </TableCell>
                          )}
                        <TableCell align="center">
                          <IconButton
                            disabled={
                              addBasketLoading === item.product.goodID || isAddButtonDisabled(item.product.goodID)
                            }
                            color="primary"
                            onClick={() => handleUpdateBasket(item.product.goodID, 'increase')}
                          >
                            {addBasketLoading === item.product.goodID ? (
                              <CircularProgress size={'20px'} color="error" />
                            ) : (
                              <AddCircleOutlineIcon />
                            )}
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            disabled={addBasketLoading === item.product.goodID}
                            color="primary"
                            onClick={() =>
                              item.quantity === 1
                                ? handleUpdateBasket(item.product.goodID, 'remove')
                                : handleUpdateBasket(item.product.goodID, 'decrease')
                            }
                          >
                            {addBasketLoading === item.product.goodID ? (
                              <CircularProgress size={'20px'} color="error" />
                            ) : (
                              <RemoveCircleOutlineIcon style={{ color: 'black' }} />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">{`${(item.product.price * item.quantity).toFixed(2)} сом`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h5" gutterBottom>
                Общая сумма: {basket.totalPrice} сом
              </Typography>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <LoadingButton
                    loading={loadingBasket()}
                    disabled={basket?.items?.length === 0}
                    onClick={() => navigate('/order')}
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 2 }}
                  >
                    Оформить заказ
                  </LoadingButton>
                </Grid>
                <Grid item>
                  <LoadingButton
                    loading={loadingBasket()}
                    disabled={basket?.items?.length === 0}
                    variant="outlined"
                    color="error"
                    onClick={() => clearBasket('clear')}
                  >
                    Очистить корзину
                  </LoadingButton>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography variant="h5" gutterBottom textAlign={'center'}>
              Нет товаров
            </Typography>
          )}
        </>
      )}
    </Paper>
  );
};

export default BasketPageOld;
