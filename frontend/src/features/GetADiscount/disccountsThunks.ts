import { createAsyncThunk } from '@reduxjs/toolkit';
import { DiscountType, DiscountTypeToServer, GlobalSuccess, PageInfo } from '../../types';
import axiosApi from '../../axiosApi';

export const createDiscount = createAsyncThunk<GlobalSuccess, DiscountTypeToServer>(
  'discounts/createDiscount',
  async (discount) => {
    try {
      const response = await axiosApi.post('/get-a-discount', discount);

      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const fetchDiscounts = createAsyncThunk<
  { discounts: DiscountType[]; pageInfo: PageInfo },
  {
    page: number;
    search: string;
  }
>('discounts/fetchDiscounts', async ({ page, search }) => {
  // Формируем URL с параметрами страницы и поиска
  const response = await axiosApi.get<{
    discounts: DiscountType[];
    pageInfo: PageInfo;
  }>(`/get-a-discount?page=${page}&search=${encodeURIComponent(search)}`);

  return response.data;
});

export const deleteDiscount = createAsyncThunk<GlobalSuccess, string>('discounts/deleteDiscount', async (id) => {
  try {
    const response = await axiosApi.delete('/get-a-discount/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});
