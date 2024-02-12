import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React from 'react';
import { FooterStyle } from '../../../../styles';

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
        background: 'rgb(55,52,147)',
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
            ':hover': { color: 'rgba(255,255,255,0.67)' },
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
