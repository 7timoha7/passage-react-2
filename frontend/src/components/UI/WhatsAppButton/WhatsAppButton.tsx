import React from 'react';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material';

const WhatsAppButton = () => {
  const MyButton = styled(Button)({
    position: 'fixed',
    bottom: 35,
    right: 35,
    width: 30,
    height: 60,
    padding: 0,
    borderRadius: '50%',
    backgroundColor: 'rgba(37,211,102,0.67)',
    '&:hover': {
      backgroundColor: 'rgba(26,210,96,0.94)',
    },
    zIndex: 99,
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (typeof window.ym !== 'undefined') {
      window.ym(
        95546639,
        'extLink',
        'https://wa.me/996553100500?text=Здравствуйте,%20я%20хочу%20связаться%20с%20вами!',
      );
    }
    window.open('https://wa.me/996553100500?text=Здравствуйте,%20я%20хочу%20связаться%20с%20вами!', '_blank');
  };

  return (
    <ThemeProvider theme={theme}>
      <a href="https://wa.me/996553100500?text=Здравствуйте,%20я%20хочу%20связаться%20с%20вами!" onClick={handleClick}>
        <MyButton>
          <WhatsAppIcon fontSize={'large'} sx={{ color: '#ffffff' }} />
        </MyButton>
      </a>
    </ThemeProvider>
  );
};

export default WhatsAppButton;
