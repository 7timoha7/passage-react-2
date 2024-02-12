import React from 'react';
import PorcelainStoneware from '../components/UI/Banners/PorcelainStoneware';
import { Box } from '@mui/material';

const MainPage = () => {
  return (
    <>
      <Box
        sx={{
          '@media (max-width:800px)': {
            display: 'none',
          },
        }}
      >
        <PorcelainStoneware />
      </Box>
    </>
  );
};

export default MainPage;
