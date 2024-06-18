import React, { useEffect, useState } from 'react';
import { Box, CardMedia, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import DesignersFormDesc from './DesignersFormDesc';
import DesignersFormGallery from './DesignersFormGallery';
import DesignersFormPdf from './DesignersFormPdf';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../app/hooks';
import {
  selectDesignerCreateDescLoading,
  selectDesignerCreateGalleryLoading,
  selectDesignerCreatePdfLoading,
  selectDesignerDeleteDescLoading,
  selectDesignerDeleteGalleryLoading,
  selectDesignerDeletePdfLoading,
  selectDesignerDesc,
  selectDesignerDescLoading,
  selectDesignerGallery,
  selectDesignerGalleryLoading,
  selectDesignerPdf,
  selectDesignerPdfLoading,
} from '../designersSlice';
import {
  deleteDesignerDesc,
  deleteDesignerGallery,
  deleteDesignerPdf,
  fetchDesignerDesc,
  fetchDesignerGallery,
  fetchDesignerPdf,
} from '../designersThunks';
import Card from '@mui/material/Card';
import { apiURL } from '../../../../../../../../../constants';
import CardContent from '@mui/material/CardContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Spinner from '../../../../../../../Spinner/Spinner';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const DesignersFormPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const desc = useAppSelector(selectDesignerDesc);
  const gallery = useAppSelector(selectDesignerGallery);
  const pdf = useAppSelector(selectDesignerPdf);

  const fetchDesk = useAppSelector(selectDesignerDescLoading);
  const fetchGallery = useAppSelector(selectDesignerGalleryLoading);
  const fetchPdf = useAppSelector(selectDesignerPdfLoading);

  const createDesk = useAppSelector(selectDesignerCreateDescLoading);
  const createGallery = useAppSelector(selectDesignerCreateGalleryLoading);
  const createPdf = useAppSelector(selectDesignerCreatePdfLoading);

  const deleteDesk = useAppSelector(selectDesignerDeleteDescLoading);
  const deleteGallery = useAppSelector(selectDesignerDeleteGalleryLoading);
  const deletePdf = useAppSelector(selectDesignerDeletePdfLoading);

  useEffect(() => {
    dispatch(fetchDesignerDesc());
    dispatch(fetchDesignerGallery());
    dispatch(fetchDesignerPdf());
  }, [dispatch]);
  const [imageSizes, setImageSizes] = useState<{ [key: string]: { width: number; height: number } }>({});
  const handleImageLoad = (id: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setImageSizes((prevSizes) => ({
      ...prevSizes,
      [id]: { width, height },
    }));
  };

  const deleteItem = async (type: string, id: string) => {
    if (type === 'desc') {
      await dispatch(deleteDesignerDesc(id));
      await dispatch(fetchDesignerDesc());
    } else if (type === 'gallery') {
      await dispatch(deleteDesignerGallery(id));
      await dispatch(fetchDesignerGallery());
    } else if (type === 'pdf') {
      await dispatch(deleteDesignerPdf(id));
      await dispatch(fetchDesignerPdf());
    }
  };

  return (
    <Box>
      <Typography sx={{ mt: '30px' }} variant="h4">
        РЕДАКТИРОВАНИЕ РАЗДЕЛА ДЛЯ ДИЗАЙНЕРОВ
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <Box>
          <Typography>ТЕКСТОВЫЙ БЛОК</Typography>
          <Box mt={3}>
            {fetchDesk ? (
              <Spinner />
            ) : (
              <>
                {desc.map((item) => {
                  return (
                    <Box key={item._id} sx={{ borderTop: '2px solid gray', position: 'relative' }} pt={1} pb={1}>
                      <Typography fontSize={'20'}>{item.title}</Typography>
                      <Typography fontSize={'15'} variant={'caption'}>
                        {item.desc}
                      </Typography>
                      <IconButton
                        sx={{ position: 'absolute', top: '0', right: '0' }}
                        disabled={createDesk || deleteDesk}
                        color={'error'}
                        onClick={() => deleteItem('desc', item._id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Box>
                  );
                })}
              </>
            )}
          </Box>

          <Container maxWidth="md">
            <DesignersFormDesc />
          </Container>
        </Box>
        <Box sx={{ borderTop: '3px solid gray', mt: 5, pt: 3 }}>
          <Typography>БЛОК ГАЛЛЕРЕЯ</Typography>
          <Box mt={3}>
            {
              <>
                {fetchGallery ? (
                  <Spinner />
                ) : (
                  <Grid container spacing={1} justifyContent={'center'}>
                    {gallery.map((item) => (
                      <Grid item key={item._id}>
                        <Card
                          sx={{
                            position: 'relative',
                            maxWidth: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            '@media (max-width:600px)': {
                              width: '200px',
                            },
                            '@media (max-width:480px)': {
                              width: '170px',
                            },
                            '@media (max-width:420px)': {
                              width: '165px',
                            },
                            '@media (max-width:400px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <img
                            src={apiURL + '/' + item.image}
                            alt="Product"
                            height={150}
                            width="100%"
                            onLoad={(e) => handleImageLoad(item._id, e)}
                            style={{ objectFit: 'contain' }}
                          />
                          <CardContent>
                            {imageSizes[item._id] && (
                              <Typography fontSize={'small'} color="text.secondary">
                                <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>Размер: </span>
                                {imageSizes[item._id].width} x {imageSizes[item._id].height}
                              </Typography>
                            )}
                            <Typography fontSize={'small'} color="text.secondary">
                              <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>Заголовок: </span> {item.caption}
                            </Typography>
                          </CardContent>
                          <IconButton
                            sx={{ position: 'absolute', top: '0', right: '0' }}
                            disabled={createGallery || deleteGallery}
                            color={'error'}
                            onClick={() => deleteItem('gallery', item._id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            }
          </Box>

          <Container maxWidth="md">
            <DesignersFormGallery />
          </Container>
        </Box>
        <Box sx={{ borderTop: '3px solid gray', mt: 5, pt: 3 }}>
          <Typography>БЛОК КОЛЕКЦИИ PDF</Typography>
          <Box mt={3}>
            {
              <>
                {fetchPdf ? (
                  <Spinner />
                ) : (
                  <Grid container spacing={1} justifyContent={'center'}>
                    {pdf.map((item) => (
                      <Grid item key={item._id}>
                        <Card sx={{ maxWidth: 300, position: 'relative' }}>
                          <CardMedia component="img" height="194" image={apiURL + '/' + item.img} alt="Paella dish" />
                          <CardContent>
                            <Typography variant="body1" color="black" textTransform={'uppercase'}>
                              {item.title}
                            </Typography>
                            <Typography color={'orange'} sx={{ fontSize: 'small', mt: 1 }}>
                              ЗАГРУЗИТЬ PDF
                            </Typography>
                          </CardContent>
                          <IconButton
                            sx={{ position: 'absolute', top: '0', right: '0' }}
                            disabled={createPdf || deletePdf}
                            color={'error'}
                            onClick={() => deleteItem('pdf', item._id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            }
          </Box>
          <Container maxWidth="md">
            <DesignersFormPdf />
          </Container>
        </Box>
      </Paper>
      <Box textAlign={'center'} mt={3}>
        <Button
          onClick={() => navigate('/designers')}
          color={'warning'}
          variant={'contained'}
          sx={{
            fontSize: 'small',
            mt: 1,
            backgroundColor: '#c7ac79', // Цвет кнопки
            '&:hover': {
              backgroundColor: '#a18b49', // Цвет кнопки при наведении
              color: '#ffffff',
            },
            '&:active': {
              backgroundColor: '#948145', // Цвет кнопки при наведении
              color: '#ffffff',
            },
          }}
        >
          назад
        </Button>
      </Box>
    </Box>
  );
};

export default DesignersFormPage;
