import { DiscountType, GlobalSuccess, PageInfo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createDiscount, deleteDiscount, fetchDiscounts } from './disccountsThunks';
import { RootState } from '../../app/store';

interface DiscountsState {
  discounts: DiscountType[];
  pageInfo: PageInfo | null;
  discountsSuccess: GlobalSuccess | null;
  fetchDiscountsLoading: boolean;
  createDiscountLoading: boolean;
  deleteDiscountLoading: string | false;
}

const initialState: DiscountsState = {
  discounts: [],
  pageInfo: null,
  discountsSuccess: null,
  fetchDiscountsLoading: false,
  createDiscountLoading: false,
  deleteDiscountLoading: false,
};

export const discountsSLice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDiscount.fulfilled, (state, { payload: success }) => {
      state.createDiscountLoading = false;
      state.discountsSuccess = success;
    });
    builder.addCase(createDiscount.pending, (state) => {
      state.createDiscountLoading = true;
    });
    builder.addCase(createDiscount.rejected, (state) => {
      state.createDiscountLoading = false;
    });
    /////////////////////////
    builder.addCase(fetchDiscounts.pending, (state) => {
      state.fetchDiscountsLoading = true;
    });
    builder.addCase(fetchDiscounts.fulfilled, (state, action) => {
      state.discounts = action.payload.discounts;
      state.pageInfo = action.payload.pageInfo;
      state.fetchDiscountsLoading = false;
    });
    builder.addCase(fetchDiscounts.rejected, (state) => {
      state.fetchDiscountsLoading = false;
    });
    /////////////////////////
    builder.addCase(deleteDiscount.fulfilled, (state, { payload: success }) => {
      state.deleteDiscountLoading = false;
      state.discountsSuccess = success;
    });
    builder.addCase(deleteDiscount.pending, (state, { meta }) => {
      state.deleteDiscountLoading = meta.arg;
    });
    builder.addCase(deleteDiscount.rejected, (state) => {
      state.deleteDiscountLoading = false;
    });
  },
});

export const discountsReducer = discountsSLice.reducer;

export const selectDiscounts = (state: RootState) => state.discounts.discounts;
export const selectPageInfo = (state: RootState) => state.discounts.pageInfo;
export const selectBDiscountsSuccess = (state: RootState) => state.discounts.discountsSuccess;
export const selectFetchDiscountsLoading = (state: RootState) => state.discounts.fetchDiscountsLoading;
export const selectCreateDiscountLoading = (state: RootState) => state.discounts.createDiscountLoading;
export const selectDeleteDiscountLoading = (state: RootState) => state.discounts.deleteDiscountLoading;
