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
import ProductTable from './Components/ProductTable';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sendOrder } from './orderThunks';
import { OrderSendType } from '../../types';
import { useSelector } from 'react-redux';
import { selectBasket } from '../Basket/basketSlice';
import { selectUser } from '../users/usersSlice';
import { fetchBasket } from '../Basket/basketThunks';

const Order = () => {
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

  const [deliveryMethod, setDeliveryMethod] = useState<string>('');
  const basket = useSelector(selectBasket);
  const deliveryMethods = ['самовывоз', 'доставка'];
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

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
        products: basket.items.map((item) => ({ product: item.product.goodID, quantity: item.quantity })),
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
      address: value === 'самовывоз' ? '' : prevData.address,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('123');
    dispatch(sendOrder(formData));
  };

  const phoneChangeHandler = (newPhone: string) => {
    setFormData((prevState) => ({ ...prevState, phoneNumber: newPhone }));
  };

  return (
    <Paper
      style={{
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '10px',
        padding: '20px',
        backgroundColor: '#dfdfdf',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {basket ? <ProductTable basket={basket} /> : null}

      <Typography variant="h6" gutterBottom>
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
          required
          style={{ marginBottom: '15px' }}
        />
        <MuiTelInput
          label={'Номер телефона'}
          onChange={phoneChangeHandler}
          defaultCountry={'KG'}
          name="phoneNumber"
          value={formData.phoneNumber}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
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
          required={deliveryMethod === 'доставка'}
          disabled={deliveryMethod === 'самовывоз' || !deliveryMethod}
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
            <Button disabled={formData.products.length <= 0} variant="contained" color="error" type="submit">
              Заказать
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
              Назад
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Order;
