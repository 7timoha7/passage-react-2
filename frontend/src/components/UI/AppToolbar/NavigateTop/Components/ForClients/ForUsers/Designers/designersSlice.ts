import { createSlice } from '@reduxjs/toolkit';
import { DesignerDescType, DesignerGalleryType, DesignerPdfType, GlobalSuccess } from '../../../../../../../../types';
import {
  createDesignerDesk,
  createDesignerGallery,
  createDesignerPdf,
  deleteDesignerDesc,
  deleteDesignerGallery,
  deleteDesignerPdf,
  fetchDesignerDesc,
  fetchDesignerGallery,
  fetchDesignerPdf,
} from './designersThunks';
import { RootState } from '../../../../../../../../app/store';

interface DesignerState {
  designerDesc: DesignerDescType[];
  designerGallery: DesignerGalleryType[];
  designerPdf: DesignerPdfType[];
  designerSuccess: GlobalSuccess | null;

  fetchDeskLoading: boolean;
  fetchGalleryLoading: boolean;
  fetchPdfLoading: boolean;

  createDeskLoading: boolean;
  createGalleryLoading: boolean;
  createPdfLoading: boolean;

  deleteDeskLoading: boolean;
  deleteGalleryLoading: boolean;
  deletePdfLoading: boolean;
}

const initialState: DesignerState = {
  designerDesc: [],
  designerGallery: [],
  designerPdf: [],
  designerSuccess: null,

  fetchDeskLoading: false,
  fetchGalleryLoading: false,
  fetchPdfLoading: false,

  createDeskLoading: false,
  createGalleryLoading: false,
  createPdfLoading: false,

  deleteDeskLoading: false,
  deleteGalleryLoading: false,
  deletePdfLoading: false,
};

export const designerSLice = createSlice({
  name: 'designer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDesignerDesk.fulfilled, (state, { payload: success }) => {
      state.createDeskLoading = false;
      state.designerSuccess = success;
    });
    builder.addCase(createDesignerDesk.pending, (state) => {
      state.createDeskLoading = true;
    });
    builder.addCase(createDesignerDesk.rejected, (state) => {
      state.createDeskLoading = false;
    });

    builder.addCase(fetchDesignerDesc.fulfilled, (state, action) => {
      state.designerDesc = action.payload;
      state.fetchDeskLoading = false;
    });
    builder.addCase(fetchDesignerDesc.pending, (state) => {
      state.fetchDeskLoading = true;
    });
    builder.addCase(fetchDesignerDesc.rejected, (state) => {
      state.fetchDeskLoading = false;
    });

    builder.addCase(deleteDesignerDesc.fulfilled, (state, { payload: success }) => {
      state.deleteDeskLoading = false;
      state.designerSuccess = success;
    });
    builder.addCase(deleteDesignerDesc.pending, (state) => {
      state.deleteDeskLoading = true;
    });
    builder.addCase(deleteDesignerDesc.rejected, (state) => {
      state.deleteDeskLoading = false;
    });
    // ************************************************************
    builder.addCase(createDesignerGallery.fulfilled, (state, { payload: success }) => {
      state.createGalleryLoading = false;
      state.designerSuccess = success;
    });
    builder.addCase(createDesignerGallery.pending, (state) => {
      state.createGalleryLoading = true;
    });
    builder.addCase(createDesignerGallery.rejected, (state) => {
      state.createGalleryLoading = false;
    });

    builder.addCase(fetchDesignerGallery.fulfilled, (state, action) => {
      state.designerGallery = action.payload;
      state.fetchGalleryLoading = false;
    });
    builder.addCase(fetchDesignerGallery.pending, (state) => {
      state.fetchGalleryLoading = true;
    });
    builder.addCase(fetchDesignerGallery.rejected, (state) => {
      state.fetchGalleryLoading = false;
    });

    builder.addCase(deleteDesignerGallery.fulfilled, (state, { payload: success }) => {
      state.deleteGalleryLoading = false;
      state.designerSuccess = success;
    });
    builder.addCase(deleteDesignerGallery.pending, (state) => {
      state.deleteGalleryLoading = true;
    });
    builder.addCase(deleteDesignerGallery.rejected, (state) => {
      state.deleteGalleryLoading = false;
    });
    // ************************************************************************
    builder.addCase(createDesignerPdf.fulfilled, (state, { payload: success }) => {
      state.createPdfLoading = false;
      state.designerSuccess = success;
    });
    builder.addCase(createDesignerPdf.pending, (state) => {
      state.createPdfLoading = true;
    });
    builder.addCase(createDesignerPdf.rejected, (state) => {
      state.createPdfLoading = false;
    });

    builder.addCase(fetchDesignerPdf.fulfilled, (state, action) => {
      state.designerPdf = action.payload;
      state.fetchPdfLoading = false;
    });
    builder.addCase(fetchDesignerPdf.pending, (state) => {
      state.fetchPdfLoading = true;
    });
    builder.addCase(fetchDesignerPdf.rejected, (state) => {
      state.fetchPdfLoading = false;
    });

    builder.addCase(deleteDesignerPdf.fulfilled, (state, { payload: success }) => {
      state.deletePdfLoading = false;
      state.designerSuccess = success;
    });
    builder.addCase(deleteDesignerPdf.pending, (state) => {
      state.deletePdfLoading = true;
    });
    builder.addCase(deleteDesignerPdf.rejected, (state) => {
      state.deletePdfLoading = false;
    });
  },
});

export const designerReducer = designerSLice.reducer;

export const selectDesignerSuccess = (state: RootState) => state.designer.designerSuccess;

export const selectDesignerDesc = (state: RootState) => state.designer.designerDesc;
export const selectDesignerGallery = (state: RootState) => state.designer.designerGallery;
export const selectDesignerPdf = (state: RootState) => state.designer.designerPdf;

export const selectDesignerDescLoading = (state: RootState) => state.designer.fetchDeskLoading;
export const selectDesignerGalleryLoading = (state: RootState) => state.designer.fetchGalleryLoading;
export const selectDesignerPdfLoading = (state: RootState) => state.designer.fetchPdfLoading;

export const selectDesignerCreateDescLoading = (state: RootState) => state.designer.createDeskLoading;
export const selectDesignerCreateGalleryLoading = (state: RootState) => state.designer.createGalleryLoading;
export const selectDesignerCreatePdfLoading = (state: RootState) => state.designer.createPdfLoading;

export const selectDesignerDeleteDescLoading = (state: RootState) => state.designer.deleteDeskLoading;
export const selectDesignerDeleteGalleryLoading = (state: RootState) => state.designer.deleteGalleryLoading;
export const selectDesignerDeletePdfLoading = (state: RootState) => state.designer.deletePdfLoading;
