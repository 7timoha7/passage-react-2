import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalSuccess, OrderSendType } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const sendOrder = createAsyncThunk<
  GlobalSuccess,
  OrderSendType,
  {
    state: RootState;
  }
>('orders/sendOrder', async (order, { getState }) => {
  const user = getState().users.user;
  try {
    const url = user ? '/orders/user' : '/orders';
    const response = await axiosApi.post(url, order);
    return response.data;
  } catch (e) {
    throw new Error();
  }
});
