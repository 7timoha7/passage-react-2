import { createAsyncThunk } from '@reduxjs/toolkit';
import { BannerToServerType, BannerType, GlobalSuccess } from '../../types';
import axiosApi from '../../axiosApi';

export const createBanners = createAsyncThunk<GlobalSuccess, BannerToServerType>(
  'banners/createBanners',
  async (bannerToServer) => {
    try {
      const formData = new FormData();

      formData.append('typeBanner', bannerToServer.typeBanner);
      formData.append('title', bannerToServer.title);
      formData.append('desk', bannerToServer.desk);
      formData.append('link', bannerToServer.link);

      if (bannerToServer.image) {
        formData.append('image', bannerToServer.image);
      }
      console.log('thunks - ' + JSON.stringify(formData));
      const response = await axiosApi.post('/banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const fetchBanners = createAsyncThunk<BannerType[]>('banners/fetchBanners', async () => {
  try {
    const response = await axiosApi.get<BannerType[]>('/banners/');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const deleteBanners = createAsyncThunk<GlobalSuccess, string>('banners/deleteBanners', async (banner_id) => {
  try {
    const response = await axiosApi.delete('/banners/' + banner_id);
    return response.data;
  } catch {
    throw new Error();
  }
});
