import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DrIconCard = () => {
  return (
    <Box
      sx={{
        borderRadius: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#5a1e1e',
        color: '#ffffff',
        fontWeight: 'bold',
        boxShadow: 3,
        p: '3px',
      }}
    >
      <Typography className="montserrat-bold" sx={{ fontSize: '13px' }}>
        -20%
      </Typography>
      <Typography className="montserrat-bold" sx={{ fontSize: '9px' }}>
        24 и 25
      </Typography>
      <Typography className="montserrat-bold" sx={{ fontSize: '9px' }}>
        ноября
      </Typography>
    </Box>
  );
};

export default DrIconCard;
