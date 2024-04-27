import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MenuCategoriesTop from '../../../../features/MenuCategories/components/MenuCategoriesTop';
import { Container, Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import UserMenu from '../UserMenu';
import AnonymousMenu from '../AnonymousMenu';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../features/users/usersSlice';
import { ToolBarTopText } from '../../../../styles';

interface Props {
  close?: () => void;
}

// Обертка для NavigateTop, чтобы установить z-index
const NavigateTopWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1101, // Установите z-index равным или больше, чем у AppBar, чтобы NavigateTop был поверх AppBar
  flexWrap: 'wrap',
  background: '#404040',
});

const NavigateTop: React.FC<Props> = ({ close }) => {
  const menu = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Новинки',
      link: '/productsNews',
    },
    {
      name: 'Доставка',
      link: '/delivery',
    },
    {
      name: 'Контакты',
      link: '/contacts',
    },
    {
      name: 'О нас',
      link: '/about',
    },
  ];

  const isMobile = useMediaQuery('(max-width:760px)');
  const isMobileMenu = useMediaQuery('@media (min-width: 1200px)');
  const user = useAppSelector(selectUser);
  const component = (
    <>
      <Box display="flex" flexWrap={'wrap'} justifyContent={'space-between'} alignItems={'center'}>
        <Box
          sx={{
            '@media (max-width: 1200px)': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            },
          }}
          display="flex"
          justifyContent={!isMobile ? 'center' : 'start'}
          alignItems={'center'}
        >
          <Box
            sx={{
              '@media (max-width: 1200px)': {
                display: 'none',
              },
            }}
          >
            {' '}
            <MenuCategoriesTop />
          </Box>

          {menu.map((item) => (
            <Button onClick={close} component={Link} to={item.link} sx={ToolBarTopText} key={item.name}>
              {item.name}
            </Button>
          ))}
        </Box>

        <Box>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Box>
      </Box>
    </>
  );

  const children = isMobileMenu ? <Container maxWidth={'xl'}>{component}</Container> : component;
  return <NavigateTopWrapper>{children}</NavigateTopWrapper>;
};

export default NavigateTop;
