import React from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar';
import MenuCategories from '../../../features/MenuCategories/MenuCategories';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import BreadcrumbsPage from '../BreadcrumbsPage/BreadcrumbsPage';
import Bestsellers from '../../../features/Bestsellers/Bestsellers';
import ProductsNews from '../../../features/Products/components/ProductsNews';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:1200px)');
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth={'xl'}>
        <BreadcrumbsPage />
      </Container>
      <Container maxWidth={'xl'} sx={{ mb: 2 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <Box sx={{ border: 'none', background: 'transparent' }}>
            <MenuCategories />
          </Box>

          <Box maxWidth={'100%'} component="main" sx={{ flex: 1, boxSizing: 'border-box' }}>
            {children}
          </Box>
        </Box>
        {location.pathname === '/' && (
          <>
            <Bestsellers />
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
