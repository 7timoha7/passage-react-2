import React, { useState } from 'react';
import { DesignerDescTypeToServer } from '../../../../../../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../app/hooks';
import { createDesignerDesk, fetchDesignerDesc } from '../designersThunks';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { btnColorOrderFormCreateOrder, colorFormBg } from '../../../../../../../../../styles';
import { selectDesignerCreateDescLoading } from '../designersSlice';

const DesignersFormDesc = () => {
  const [descFormData, setDescFormData] = useState<DesignerDescTypeToServer>({ title: '', desc: '' });
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDesignerCreateDescLoading);
  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDescFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitDesc = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(createDesignerDesk(descFormData));
    setDescFormData({ title: '', desc: '' });
    await dispatch(fetchDesignerDesc());
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
        <form onSubmit={handleSubmitDesc} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#ffffff', textTransform: 'uppercase' }}>
                Добавить текст
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="deskTitle"
                label="ЗОГОЛОВОК"
                name="title"
                value={descFormData.title}
                onChange={handleDescChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="deskDescription"
                label="ТЕКСТ"
                name="desc"
                value={descFormData.desc}
                onChange={handleDescChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                fullWidth
                sx={btnColorOrderFormCreateOrder}
              >
                СОЗДАТЬ ТЕКСТ
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default DesignersFormDesc;
