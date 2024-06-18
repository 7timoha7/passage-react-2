import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DesignerDescType,
  DesignerDescTypeToServer,
  DesignerGalleryType,
  DesignerGalleryTypeToServer,
  DesignerPdfType,
  DesignerPdfTypeToServer,
  GlobalSuccess,
} from '../../../../../../../../types';
import axiosApi from '../../../../../../../../axiosApi';

export const createDesignerDesk = createAsyncThunk<GlobalSuccess, DesignerDescTypeToServer>(
  'designer/createDesignerDesk',
  async (designerDescToServer) => {
    try {
      const response = await axiosApi.post('/designers/desc', designerDescToServer);
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const fetchDesignerDesc = createAsyncThunk<DesignerDescType[]>('designer/fetchDesignerDesc', async () => {
  try {
    const response = await axiosApi.get<DesignerDescType[]>('/designers/desc');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const deleteDesignerDesc = createAsyncThunk<GlobalSuccess, string>('designer/deleteDesignerDesc', async (id) => {
  try {
    const response = await axiosApi.delete('/designers/desc/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

// *******************************************************************************************

export const createDesignerGallery = createAsyncThunk<GlobalSuccess, DesignerGalleryTypeToServer>(
  'designer/createDesignerGallery',
  async (designerGalleryToServer) => {
    try {
      const formData = new FormData();

      formData.append('caption', designerGalleryToServer.caption);

      if (designerGalleryToServer.image) {
        formData.append('image', designerGalleryToServer.image);
      }
      const response = await axiosApi.post('/designers/gallery', formData, {
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

export const fetchDesignerGallery = createAsyncThunk<DesignerGalleryType[]>(
  'designer/fetchDesignerGallery',
  async () => {
    try {
      const response = await axiosApi.get<DesignerGalleryType[]>('/designers/gallery');
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const deleteDesignerGallery = createAsyncThunk<GlobalSuccess, string>(
  'designer/deleteDesignerGallery',
  async (id) => {
    try {
      const response = await axiosApi.delete('/designers/gallery/' + id);
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

// ******************************************************************

export const createDesignerPdf = createAsyncThunk<GlobalSuccess, DesignerPdfTypeToServer>(
  'designer/createDesignerPdf',
  async (designerPdfToServer) => {
    try {
      const formData = new FormData();

      formData.append('title', designerPdfToServer.title);

      if (designerPdfToServer.img) {
        formData.append('img', designerPdfToServer.img);
      }

      if (designerPdfToServer.pdf) {
        formData.append('pdf', designerPdfToServer.pdf);
      }

      const response = await axiosApi.post('/designers/pdf/', formData, {
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

export const fetchDesignerPdf = createAsyncThunk<DesignerPdfType[]>('designer/fetchDesignerPdf', async () => {
  try {
    const response = await axiosApi.get<DesignerPdfType[]>('/designers/pdf');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const deleteDesignerPdf = createAsyncThunk<GlobalSuccess, string>('designer/deleteDesignerPdf', async (id) => {
  try {
    const response = await axiosApi.delete('/designers/pdf/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});
