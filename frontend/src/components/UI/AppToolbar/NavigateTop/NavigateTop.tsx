import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React from 'react';

const NavigateTop = () => {
  const menu = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Контакты',
      link: '/contacts',
    },
    {
      name: 'Акции',
      link: '/special-offers',
    },
    {
      name: 'О нас',
      link: '/about',
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent={'center'}
      sx={{
        flexWrap: 'wrap',
        background:
          'linear-gradient(90deg, rgba(80,65,65,0.3402961282169118) 0%, rgba(200,39,39,0.3010804419424019) 50%, rgba(72,55,55,0.3346938873205533) 100%)',
      }}
    >
      {menu.map((item) => (
        <Button
          component={Link}
          to={item.link}
          sx={{
            color: 'black',
            fontSize: '15px',
            // fontWeight: 'bold',
            textDecoration: 'none',
            marginRight: '50px',
            ':hover': { color: 'rgba(185,31,31,0.67)' },
          }}
          key={item.name}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
};

export default NavigateTop;
