import React, { useEffect } from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar';
import MenuCategories from '../../../features/MenuCategories/MenuCategories';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import BreadcrumbsPage from '../BreadcrumbsPage/BreadcrumbsPage';
import Bestsellers from '../../../features/Bestsellers/Bestsellers';
import ProductsNews from '../../../features/Products/components/ProductsNews';
import ProductsFor from '../../../features/ProductsFor/components/ProductsFor';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProductsForID, setProductsForID } from '../../../features/ProductsFor/productsForSlice';
import PorcelainStoneware from '../Banners/PorcelainStoneware';
import PorcelainStoneware2 from '../Banners/PorcelainStoneware2';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:1200px)');
  const location = useLocation();
  const productsForID = useAppSelector(selectProductsForID);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!location.pathname.includes('/product/')) {
      dispatch(setProductsForID(null));
    }
  }, [dispatch, location.pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>
        <AppToolbar />
      </header>

      <Box sx={{ background: '#404040' }}>
        <Container maxWidth={'xl'} sx={{ color: '#ffffff' }}>
          <BreadcrumbsPage />
        </Container>
      </Box>
      <MenuCategories />

      {location.pathname === '/' && (
        <Box
        // sx={{
        //   '@media (max-width:800px)': {
        //     display: 'none',
        //   },
        // }}
        >
          {/*<PorcelainStoneware />*/}

          <PorcelainStoneware />
        </Box>
      )}

      <Container maxWidth={'xl'} sx={{ mb: 2 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          {/*<Box sx={{ border: 'none', background: 'transparent' }}></Box>*/}

          <Box maxWidth={'100%'} component="main" sx={{ flex: 1, boxSizing: 'border-box' }}>
            {children}
          </Box>
        </Box>
      </Container>

      {location.pathname === '/' && (
        <Box
        // sx={{
        //   '@media (max-width:800px)': {
        //     display: 'none',
        //   },
        // }}
        >
          {/*<PorcelainStoneware />*/}

          <PorcelainStoneware2 />
        </Box>
      )}

      <Container maxWidth={'xl'} sx={{ mb: 2 }}>
        {location.pathname.includes('/product/') && (
          <>{productsForID && <ProductsFor categoriesID={productsForID} />}</>
        )}
        {location.pathname === '/' && (
          <>
            <ProductsNews />
          </>
        )}
      </Container>

      <footer style={{ flexShrink: 0, marginTop: 'auto' }}>
        <Footer />
      </footer>
    </Box>
  );
};

export default Layout;
