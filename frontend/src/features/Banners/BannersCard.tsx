import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectBanners, selectDeleteBannersLoading, selectFetchBannersLoading } from './bannersSlice';
import { deleteBanners, fetchBanners } from './bannersThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import Card from '@mui/material/Card';
import { Grid, IconButton, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { apiURL } from '../../constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BannerType } from '../../types';

interface Props {
  typeBanner: string;
}

const BannersCard: React.FC<Props> = ({ typeBanner }) => {
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBanners);
  const loadingBanners = useAppSelector(selectFetchBannersLoading);
  const deleteLoading = useAppSelector(selectDeleteBannersLoading);

  const [imageSizes, setImageSizes] = useState<{ [key: string]: { width: number; height: number } }>({});
  const [bannersState, setBannersState] = useState<BannerType[]>([]);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    const filteredBanners = banners.filter((item) => item.typeBanner === typeBanner);
    setBannersState(filteredBanners);
  }, [banners, typeBanner]);

  const deleteBanner = async (id: string) => {
    await dispatch(deleteBanners(id));
    await dispatch(fetchBanners());
  };

  const handleImageLoad = (id: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setImageSizes((prevSizes) => ({
      ...prevSizes,
      [id]: { width, height },
    }));
  };

  return (
    <>
      {loadingBanners ? (
        <Spinner />
      ) : (
        <Grid container spacing={1} justifyContent={'center'}>
          {bannersState.map((item) => (
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
                    <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>Заголовок: </span> {item.title}
                  </Typography>
                  <Typography fontSize={'small'} color="text.secondary">
                    <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>Описание: </span>
                    {item.desk}
                  </Typography>
                  <Typography fontSize={'small'} color="text.secondary">
                    <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>Ссылка: </span>
                    {item.link}
                  </Typography>
                </CardContent>
                <IconButton
                  sx={{ position: 'absolute', top: '0', right: '0' }}
                  disabled={deleteLoading}
                  color={'error'}
                  onClick={() => deleteBanner(item._id)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default BannersCard;
