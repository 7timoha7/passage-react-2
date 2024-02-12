import React from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar';
import MenuCategories from '../../../features/MenuCategories/MenuCategories';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import BreadcrumbsPage from '../BreadcrumbsPage/BreadcrumbsPage';
import Bestsellers from '../../../features/Bestsellers/Bestsellers';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:1200px)');
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>
        <AppToolbar />
      </header>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          mt: 4,
        }}
      >
        <Box sx={{ border: 'none' }}>
          <MenuCategories />
        </Box>

        <Box maxWidth={'100%'} component="main" sx={{ flex: 1, boxSizing: 'border-box' }}>
          <BreadcrumbsPage />
          {location.pathname === '/' ? <Box>{children}</Box> : <Container sx={{ mt: 2, mb: 2 }}>{children}</Container>}
        </Box>
      </Box>
      {location.pathname === '/' && (
        <Container maxWidth={'xl'}>
          <Bestsellers />
        </Container>
      )}

      <footer style={{ flexShrink: 0, marginTop: '10px' }}>
        <Footer />
      </footer>
    </Box>
  );
};

export default Layout;
