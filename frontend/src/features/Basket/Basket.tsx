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
  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [stateBasket, setStateBasket] = useState<BasketTypeOnServerMutation | null>(null);
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  // const addBasketLoading = useAppSelector(selectBasketUpdateLoading);

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

    // if (storedBasketId) {
    //   dispatch(createBasket({ sessionKey: storedBasketId }));
    //   dispatch(fetchBasket(storedBasketId));
    // } else {
    //   storedBasketId = uuidv4();
    //   localStorage.setItem('sessionKey', storedBasketId);
    // }
  }, [user, dispatch]);

  // const loadingBasket = () => {
  //   return !!addBasketLoading;
  // };
  //
  // const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);

  // const handleUpdateBasket = async (product_id: string, action: 'increase' | 'decrease' | 'remove') => {
  //   if (user) {
  //     await dispatch(updateBasket({ sessionKey: user._id, product_id, action }));
  //     await dispatch(fetchBasket(user._id));
  //   } else if (basket?.session_key) {
  //     await dispatch(updateBasket({ sessionKey: basket.session_key, product_id, action }));
  //     await dispatch(fetchBasket(basket.session_key));
  //   }
  // };

  // const clearBasket = async (action: 'clear') => {
  //   if (basket?.session_key) {
  //     await dispatch(updateBasket({ action: action, sessionKey: basket.session_key, product_id: action }));
  //     await dispatch(fetchBasket(basket.session_key));
  //     setAnchorEl(null);
  //   } else if (user) {
  //     await dispatch(updateBasket({ action: action, sessionKey: user._id, product_id: action }));
  //     await dispatch(fetchBasket(user._id));
  //     setAnchorEl(null);
  //   }
  // };

  // const navigateToFullBasket = async () => {
  //   navigate('/basket');
  //   setAnchorEl(null);
  // };

  // const isAddButtonDisabled = (goodID: string) => {
  //   // Проверяем, существует ли корзина и есть ли в ней товары
  //   if (!basket || !basket.items || basket.items.length === 0) {
  //     return false; // Возвращаем false, чтобы активировать кнопку
  //   }
  //
  //   // Ищем товар в корзине по его goodID
  //   const item = basket.items.find((item) => item.product.goodID === goodID);
  //
  //   // Если товар не найден или нет данных о количестве товара, возвращаем false
  //   if (!item || !item.product.quantity) {
  //     return false;
  //   }
  //
  //   // Получаем массив всех доступных количеств товара на складах
  //   const stockQuantities = item.product.quantity.map((quantityItem) => quantityItem.quantity);
  //
  //   // Получаем общее доступное количество товара на всех складах
  //   const totalStockQuantity = stockQuantities.reduce((total, quantity) => total + quantity, 0);
  //
  //   // Если количество товара в корзине превышает общее доступное количество товара на всех складах,
  //   // возвращаем true, чтобы дизейблить кнопку
  //   if (item.quantity >= totalStockQuantity) {
  //     return true;
  //   }
  //
  //   // В остальных случаях возвращаем false, чтобы активировать кнопку
  //   return false;
  // };

  return (
    <>
      <IconButton aria-label="Корзина" color="inherit" onClick={() => navigate('/basket')}>
        <Badge badgeContent={basket?.items?.length || 0} color="error">
          <ShoppingCartIcon sx={{ color: '#ffffff' }} fontSize="large" />
        </Badge>
      </IconButton>
      {/*<Popover*/}
      {/*  open={open}*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  onClose={handlePopoverClose}*/}
      {/*  anchorOrigin={{*/}
      {/*    vertical: 'bottom',*/}
      {/*    horizontal: 'right',*/}
      {/*  }}*/}
      {/*  transformOrigin={{*/}
      {/*    vertical: 'top',*/}
      {/*    horizontal: 'right',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <IconButton aria-label="Закрыть" onClick={handlePopoverClose}>*/}
      {/*    <DisabledByDefaultIcon />*/}
      {/*  </IconButton>*/}
      {/*  <TableContainer>*/}
      {/*    <Table>*/}
      {/*      <TableBody>*/}
      {/*        {basket &&*/}
      {/*          basket.items &&*/}
      {/*          basket.items.length > 0 &&*/}
      {/*          basket.items.map((item, index) => (*/}
      {/*            <TableRow key={item.product.goodID + index}>*/}
      {/*              <TableCell>*/}
      {/*                <Typography*/}
      {/*                  variant="body1"*/}
      {/*                  style={{ cursor: 'pointer' }}*/}
      {/*                  onClick={() => navigate('/product/' + item.product._id)}*/}
      {/*                >*/}
      {/*                  {item.product.name}*/}
      {/*                </Typography>*/}
      {/*              </TableCell>*/}
      {/*              <TableCell>{item.quantity}</TableCell>*/}
      {/*              <TableCell>*/}
      {/*                {isAddButtonDisabled(item.product.goodID) && <Button>Под заказ</Button>}*/}

      {/*                <IconButton*/}
      {/*                  disabled={addBasketLoading === item.product.goodID || isAddButtonDisabled(item.product.goodID)}*/}
      {/*                  color="primary"*/}
      {/*                  onClick={() => handleUpdateBasket(item.product.goodID, 'increase')}*/}
      {/*                >*/}
      {/*                  {addBasketLoading === item.product.goodID ? (*/}
      {/*                    <CircularProgress size={'23px'} color="error" />*/}
      {/*                  ) : (*/}
      {/*                    <AddCircleOutlineIcon />*/}
      {/*                  )}*/}
      {/*                </IconButton>*/}
      {/*                <IconButton*/}
      {/*                  disabled={addBasketLoading === item.product.goodID}*/}
      {/*                  color="primary"*/}
      {/*                  style={{ color: 'black' }} // ваш цвет для кнопок -*/}
      {/*                  onClick={() =>*/}
      {/*                    item.quantity === 1*/}
      {/*                      ? handleUpdateBasket(item.product.goodID, 'remove')*/}
      {/*                      : handleUpdateBasket(item.product.goodID, 'decrease')*/}
      {/*                  }*/}
      {/*                >*/}
      {/*                  {addBasketLoading === item.product.goodID ? (*/}
      {/*                    <CircularProgress size={'23px'} color="error" />*/}
      {/*                  ) : (*/}
      {/*                    <RemoveCircleOutlineIcon />*/}
      {/*                  )}*/}
      {/*                </IconButton>*/}
      {/*              </TableCell>*/}
      {/*              <TableCell>*/}
      {/*                <Typography variant="body2">{`${(item.product.price * item.quantity).toFixed(*/}
      {/*                  2,*/}
      {/*                )} сом`}</Typography>*/}
      {/*              </TableCell>*/}
      {/*            </TableRow>*/}
      {/*          ))}*/}
      {/*      </TableBody>*/}
      {/*    </Table>*/}
      {/*  </TableContainer>*/}
      {/*  <Divider />*/}
      {/*  <ListItem>*/}
      {/*    <Typography variant="subtitle1">Общая сумма: {basket?.totalPrice} сом</Typography>*/}
      {/*  </ListItem>*/}
      {/*  <Divider />*/}
      {/*  <Grid container spacing={2} sx={{ p: 1 }}>*/}
      {/*    <Grid item>*/}
      {/*      <LoadingButton*/}
      {/*        loading={loadingBasket()}*/}
      {/*        onClick={() => navigateToFullBasket()}*/}
      {/*        variant="outlined"*/}
      {/*        color="primary"*/}
      {/*      >*/}
      {/*        Перейти в корзину*/}
      {/*      </LoadingButton>*/}
      {/*    </Grid>*/}
      {/*    <Grid item>*/}
      {/*      <LoadingButton*/}
      {/*        loading={loadingBasket()}*/}
      {/*        disabled={basket?.items?.length === 0}*/}
      {/*        onClick={() => clearBasket('clear')}*/}
      {/*        variant="text"*/}
      {/*        color="error"*/}
      {/*      >*/}
      {/*        Очистить корзину*/}
      {/*      </LoadingButton>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</Popover>*/}
    </>
  );
};

export default Basket;
