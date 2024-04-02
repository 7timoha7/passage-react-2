import { AppBar, Box, Container, Grid, styled, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ToolBarMobileStyles, ToolBarStyles } from '../../../styles';
import NavigateTop from './NavigateTop/NavigateTop';
import Search from './NavigateTop/Components/Search';
import React from 'react';
import Basket from '../../../features/Basket/Basket';

const AppToolbar = () => {
  const isMobile = useMediaQuery('(max-width:1200px)');

  const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });
  return (
    <Box mb={3} sx={{ flexGrow: 1, margin: 0 }}>
      {!isMobile && <NavigateTop />}

      <AppBar position="sticky" sx={!isMobile ? ToolBarStyles : ToolBarMobileStyles}>
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ '@media (max-width: 550px)': { justifyContent: 'center' } }}
            >
              <Grid
                item
                textAlign={'center'}
                sx={{
                  background: 'rgb(100,100,100)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2.5,
                  borderRadius: '50%',
                  mt: 2,
                  mb: 2,
                }}
              >
                <Link to="/" style={{ margin: 'auto' }}>
                  <img style={{ maxWidth: '200px' }} src="/logo2.svg" alt="passage" />
                </Link>
                <Typography variant={'inherit'} sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '12px' }}>
                  дизайнерские решения
                </Typography>
                <Typography
                  variant={'inherit'}
                  sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '12px', marginTop: '-5px' }}
                >
                  отделочные материалы
                </Typography>
              </Grid>

              <Grid item sx={{ flexGrow: 1, minWidth: 0 }}>
                <Search />
              </Grid>

              <Grid item>
                <Basket />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
