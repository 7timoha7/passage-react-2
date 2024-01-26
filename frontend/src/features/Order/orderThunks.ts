import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalSuccess, OrderFromServerType, OrderSendType } from '../../types';
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

export const getOrders = createAsyncThunk<OrderFromServerType[]>('orders/getOrders', async () => {
  try {
    const responseOrders = await axiosApi.get<OrderFromServerType[]>('/orders');
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const getForAdminHisOrders = createAsyncThunk<OrderFromServerType[], string>(
  'orders/getOrdersForAdmin',
  async (id) => {
    try {
      const responseOrders = await axiosApi.get<OrderFromServerType[]>('/orders?admin=' + id);
      return responseOrders.data;
    } catch {
      throw new Error();
    }
  },
);

export interface ChangeStatusProps {
  id: string;
  status: string;
}

export const changeStatusOrder = createAsyncThunk<GlobalSuccess, ChangeStatusProps>(
  'orders/changeStatus',
  async (data) => {
    try {
      const response = await axiosApi.patch<GlobalSuccess>('/orders/' + data.id, { status: data.status });
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const deleteOrder = createAsyncThunk<GlobalSuccess, string>('orders/deleteOrder', async (id) => {
  try {
    const response = await axiosApi.delete<GlobalSuccess>('/orders/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});
