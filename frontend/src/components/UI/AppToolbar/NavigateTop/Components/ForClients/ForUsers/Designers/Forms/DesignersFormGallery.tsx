import React, { useState } from 'react';
import { Box, Button, Card, CardMedia, Grid, IconButton, TextField, Typography } from '@mui/material';
import { btnColorOrderFormCancel, btnColorOrderFormCreateOrder, colorFormBg } from '../../../../../../../../../styles';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { DesignerGalleryTypeToServer } from '../../../../../../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../app/hooks';
import { createDesignerGallery, fetchDesignerGallery } from '../designersThunks';
import { selectDesignerCreateGalleryLoading } from '../designersSlice';

const DesignersFormGallery = () => {
  const [galleryFormData, setGalleryFormData] = useState<DesignerGalleryTypeToServer>({ caption: '', image: null });
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDesignerCreateGalleryLoading);

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    setGalleryFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files?.[0] || null : value,
    }));
  };

  const handleRemoveGalleryImage = () => {
    setGalleryFormData((prevData) => ({ ...prevData, image: null }));
    const fileInput = document.getElementById('galleryImageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmitGallery = async (event: React.FormEvent) => {
    event.preventDefault();
    if (galleryFormData.image) {
      await dispatch(createDesignerGallery(galleryFormData));
      setGalleryFormData({ caption: '', image: null });
      const fileInput = document.getElementById('galleryImageInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      await dispatch(fetchDesignerGallery());
    } else {
      alert('Выберите изображение перед отправкой формы.');
    }
  };
  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: colorFormBg,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleSubmitGallery} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#ffffff', textTransform: 'uppercase' }}>
                Добавить картинку в галерею
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="galleryCaption"
                label="НАЗВАНИЕ"
                name="caption"
                value={galleryFormData.caption}
                onChange={(e) => setGalleryFormData({ ...galleryFormData, caption: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleGalleryChange}
                  id="galleryImageInput"
                  style={{ display: 'none' }}
                />
                <label htmlFor="galleryImageInput">
                  <Button disabled={loading} component="span" variant="outlined" sx={btnColorOrderFormCancel}>
                    Выберите изображение
                  </Button>
                </label>
                <span style={{ marginLeft: '10px' }}>{galleryFormData.image?.name}</span>
              </div>
            </Grid>
            {galleryFormData.image && (
              <Grid item xs={12}>
                <Card style={{ position: 'relative' }}>
                  <CardMedia component="img" alt="Image Preview" image={URL.createObjectURL(galleryFormData.image)} />
                  <IconButton
                    disabled={loading}
                    color="error"
                    onClick={handleRemoveGalleryImage}
                    style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(150,135,135,0.45)' }}
                  >
                    <CloseIcon color={'error'} />
                  </IconButton>
                </Card>
              </Grid>
            )}
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                fullWidth
                sx={btnColorOrderFormCreateOrder}
              >
                Создать изображение
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default DesignersFormGallery;
