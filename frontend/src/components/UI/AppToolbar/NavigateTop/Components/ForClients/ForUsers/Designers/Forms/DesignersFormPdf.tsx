import React, { useState } from 'react';
import { Box, Button, Card, CardMedia, Grid, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { DesignerPdfTypeToServer } from '../../../../../../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../app/hooks';
import { createDesignerPdf, fetchDesignerPdf } from '../designersThunks';
import { btnColorOrderFormCancel, btnColorOrderFormCreateOrder, colorFormBg } from '../../../../../../../../../styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { selectDesignerCreatePdfLoading } from '../designersSlice';

const DesignersFormPdf: React.FC = () => {
  const [pdfFormData, setPdfFormData] = useState<DesignerPdfTypeToServer>({ title: '', img: null, pdf: null });
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDesignerCreatePdfLoading);

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setPdfFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleRemoveFile = (fieldName: keyof DesignerPdfTypeToServer) => {
    setPdfFormData((prevData) => ({ ...prevData, [fieldName]: null }));
    const fileInput = document.getElementById(`${fieldName}Input`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmitPdf = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pdfFormData.img && pdfFormData.pdf) {
      await dispatch(createDesignerPdf(pdfFormData));
      setPdfFormData({ title: '', img: null, pdf: null });
      const fileInputImg = document.getElementById('imgInput') as HTMLInputElement;
      const fileInputPdf = document.getElementById('pdfInput') as HTMLInputElement;
      if (fileInputImg) {
        fileInputImg.value = '';
      }
      if (fileInputPdf) {
        fileInputPdf.value = '';
      }
      await dispatch(fetchDesignerPdf());
    } else {
      alert('Выберите изображение или PDF перед отправкой формы.');
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
        <form onSubmit={handleSubmitPdf} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#ffffff', textTransform: 'uppercase' }}>
                Добавить коллекцию с PDF
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="pdfTitle"
                label="НАЗВАНИЕ"
                name="title"
                value={pdfFormData.title}
                onChange={(e) => setPdfFormData({ ...pdfFormData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  name="img"
                  onChange={handlePdfChange}
                  id="imgInput"
                  style={{ display: 'none' }}
                />
                <label htmlFor="imgInput">
                  <Button disabled={loading} component="span" variant="outlined" sx={btnColorOrderFormCancel}>
                    Выберите изображение
                  </Button>
                </label>
                <span style={{ marginLeft: '10px', color: '#ffffff' }}>{pdfFormData.img?.name}</span>
              </div>
            </Grid>
            {pdfFormData.img && (
              <Grid item xs={12}>
                <Card style={{ position: 'relative' }}>
                  <CardMedia component="img" alt="Image Preview" image={URL.createObjectURL(pdfFormData.img)} />
                  <IconButton
                    disabled={loading}
                    color="error"
                    onClick={() => handleRemoveFile('img')}
                    style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(150,135,135,0.45)' }}
                  >
                    <CloseIcon color={'error'} />
                  </IconButton>
                </Card>
              </Grid>
            )}
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="file"
                  accept="application/pdf"
                  name="pdf"
                  onChange={handlePdfChange}
                  id="pdfInput"
                  style={{ display: 'none' }}
                />
                <label htmlFor="pdfInput">
                  <Button disabled={loading} component="span" variant="outlined" sx={btnColorOrderFormCancel}>
                    Выберите PDF файл
                  </Button>
                </label>
              </div>
            </Grid>
            {pdfFormData.pdf && (
              <Grid item xs={12}>
                <Grid container alignItems={'center'}>
                  <Grid item>
                    <Typography>
                      Файл PDF: <span style={{ color: '#ffffff' }}>{pdfFormData.pdf.name}</span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton disabled={loading} onClick={() => handleRemoveFile('pdf')}>
                      <DeleteForeverIcon color={'error'} fontSize={'medium'} />
                    </IconButton>
                  </Grid>
                </Grid>
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
                СОЗДАТЬ КОЛЛЕКЦИЮ PDF
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default DesignersFormPdf;
