import { AppBar, Box, Container, Grid, styled, Toolbar, useMediaQuery } from '@mui/material';
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
              <Grid item>
                <Link to="/" style={{ margin: 'auto' }}>
                  <img style={{ maxWidth: '300px' }} src="/logo_brown.png" alt="passage" />
                </Link>
              </Grid>

              <Grid item sx={{ flexGrow: 2, minWidth: 0, ml: 2, mr: 2 }}>
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
