import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProductsNews, selectProductsNewsLoading, selectProductsNewsPageInfo } from '../productsSlise';
import { productsFetchNews } from '../productsThunks';
import { selectBasket } from '../../Basket/basketSlice';
import { ProductType } from '../../../types';
import { Box, Grid, Stack, useMediaQuery } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ProductsNews = () => {
  const productsNews = useAppSelector(selectProductsNews);
  const productsNewsLoading = useAppSelector(selectProductsNewsLoading);
  const productsNewsPageInfo = useAppSelector(selectProductsNewsPageInfo);
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productsFetchNews(1));
  }, [dispatch]);

  const indicator = (item: ProductType) => {
    if (basket && item) {
      return basket.items.some((itemBasket) => itemBasket.product.goodID === item.goodID);
    } else {
      return false;
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(productsFetchNews(page));
  };

  const renderPagination = () => {
    if (productsNewsPageInfo && productsNewsPageInfo.totalPages > 1) {
      return (
        <Box display="flex" justifyContent="center">
          <Stack spacing={2}>
            <Pagination
              showFirstButton
              showLastButton
              count={productsNewsPageInfo.totalPages}
              page={productsNewsPageInfo.currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size={'small'}
            />
          </Stack>
        </Box>
      );
    }
    return null;
  };

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      sx={{
        border: '5px solid rgba(55,52,147,0.82)',
        borderRadius: '10px',
        marginTop: '10px',
        pt: 2,
        pb: 2,
      }}
    >
      <Box mb={2}>
        <Typography variant="h4" fontWeight={'bold'} style={{ marginLeft: '2%' }}>
          Новинки
        </Typography>
      </Box>

      {renderPagination()}

      {productsNewsLoading ? (
        <Spinner />
      ) : (
        <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={2} mb={2} justifyContent={'center'}>
          {productsNews.map((item) => (
            <Grid item key={item._id}>
              <ProductCard product={item} indicator={indicator(item)} />
            </Grid>
          ))}
        </Grid>
      )}

      {renderPagination()}
    </Box>
  );
};

export default ProductsNews;
