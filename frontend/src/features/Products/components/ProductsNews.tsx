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
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsNews = () => {
  const productsNews = useAppSelector(selectProductsNews);
  const productsNewsLoading = useAppSelector(selectProductsNewsLoading);
  const productsNewsPageInfo = useAppSelector(selectProductsNewsPageInfo);
  const basket = useAppSelector(selectBasket);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page');

  useEffect(() => {
    if (page) {
      dispatch(productsFetchNews(Number(page)));
    } else if (location.pathname === '/' || location.pathname === '/productsNews') {
      dispatch(productsFetchNews(1));
    }
  }, [dispatch, location.pathname, page]);

  const indicator = (item: ProductType) => {
    if (basket && basket.items.length && item) {
      return basket.items.some((itemBasket) => itemBasket.product.goodID === item.goodID);
    } else {
      return false;
    }
  };

  const handlePageChange = async (_event: React.ChangeEvent<unknown>, page: number) => {
    await dispatch(productsFetchNews(page));
    if (location.pathname === '/') {
      const newPath = `/productsNews?page=${page}`;
      await dispatch(productsFetchNews(page));
      navigate(newPath);
    }
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
        // border: ProductsNewsBorderStyles,
        borderRadius: '10px',
        pt: 2,
        pb: 3,
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
        <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={2} mb={3} justifyContent={'center'}>
          {productsNews &&
            productsNews.length &&
            productsNews.map((item) => (
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
