import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import ProductTable from './ProductTable';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { sendOrder } from '../orderThunks';
import { OrderSendType } from '../../../types';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../Basket/basketSlice';
import { selectUser } from '../../users/usersSlice';
import { fetchBasket, updateBasket } from '../../Basket/basketThunks';
import { selectSendOrderLoading } from '../orderSlice';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { btnColorOrderFormCancel, btnColorOrderFormCreateOrder, colorFormBg } from '../../../styles';

const OrderForm = () => {
  const [formData, setFormData] = useState<OrderSendType>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    email: '',
    paymentMethod: '',
    deliveryMethod: '',
    orderComment: '',
    products: [],
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [deliveryMethod, setDeliveryMethod] = useState<string>('');
  const basket = useSelector(selectBasket);
  const deliveryMethods = ['Самовывоз', 'Доставка'];
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const sendOrderLoading = useAppSelector(selectSendOrderLoading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchBasket('1'));
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Копирование продуктов из корзины в стейт
    if (basket && basket.items) {
      setFormData((prevData) => ({
        ...prevData,
        products: basket.items.map((item) => ({
          product: item.product.goodID,
          quantity: item.quantity,
          quantityToOrder: item.quantityToOrder,
        })),
      }));
    }
  }, [basket]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeliveryChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setDeliveryMethod(value as string);
    setFormData((prevData) => ({
      ...prevData,
      deliveryMethod: value as string,
      address: value === 'Самовывоз' ? '' : prevData.address,
    }));
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.phoneNumber) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    await dispatch(sendOrder(formData));
    setDialogOpen(true);
  };

  const handleCloseDialog = async () => {
    await clearBasket('clear');
    setDialogOpen(false);
    navigate('/');
  };

  const phoneChangeHandler = (newPhone: string) => {
    setFormData((prevState) => ({ ...prevState, phoneNumber: newPhone }));
  };

  return (
    <Paper
      style={{
        margin: 'auto',
        marginTop: '10px',
        padding: '20px',
        background: colorFormBg,
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {basket && <ProductTable basket={basket} />}

      <Typography color={'white'} variant="h6" gutterBottom>
        Заполните данные
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} component="form" onSubmit={(event) => handleSubmit(event)}>
        <TextField
          label="Имя"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={{ marginBottom: '15px' }}
        />
        <TextField
          label="Фамилия"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <MuiTelInput
          label={'Номер телефона'}
          onChange={phoneChangeHandler}
          defaultCountry={'KG'}
          name="phoneNumber"
          value={formData.phoneNumber}
          style={{ marginBottom: '15px' }}
          required
          error={phoneError}
          helperText={phoneError ? 'Пожалуйста, введите номер телефона' : ''}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
          type={'email'}
        />
        <FormControl style={{ marginBottom: '15px', width: '100%' }}>
          <InputLabel id="paymentMethodLabel">Способ оплаты *</InputLabel>
          <Select
            labelId="paymentMethodLabel"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleSelectChange}
            required
            label={'Способ оплаты *'}
          >
            <MenuItem value="наличные">Наличные</MenuItem>
            <MenuItem value="безналичные">Безналичные</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ marginBottom: '15px', width: '100%' }}>
          <InputLabel id="deliveryMethodLabel">Способ доставки *</InputLabel>
          <Select
            labelId="deliveryMethodLabel"
            name="deliveryMethod"
            value={deliveryMethod}
            onChange={handleDeliveryChange}
            required
            label={'Способ доставки *'}
          >
            {deliveryMethods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Адрес доставки"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required={deliveryMethod === 'Доставка'}
          disabled={deliveryMethod === 'Самовывоз' || !deliveryMethod}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          label="Комментарии к заказу"
          name="orderComment"
          value={formData.orderComment}
          onChange={handleChange}
          multiline
          rows={4}
          style={{ marginBottom: '15px' }}
        />
        <Grid container spacing={2}>
          <Grid item>
            <LoadingButton
              loading={sendOrderLoading}
              disabled={formData.products.length <= 0}
              variant="contained"
              type="submit"
              sx={btnColorOrderFormCreateOrder}
            >
              Заказать
            </LoadingButton>
          </Grid>
          <Grid item>
            <Button sx={btnColorOrderFormCancel} variant="outlined" onClick={() => navigate(-1)}>
              Назад
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Ваш заказ принят</DialogTitle>
        <DialogContent>
          <Typography>В ближайшее время с вами свяжется администратор для подтверждения заказа.</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} onClick={handleCloseDialog} sx={btnColorOrderFormCancel}>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default OrderForm;
