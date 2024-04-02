import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../../../features/MenuCategories/menuCategoriesSlice';
import { selectProductOne } from '../../../features/Products/productsSlise';

const BreadcrumbsPage = () => {
  const location = useLocation();
  const url = location.pathname;

  const parts = url.split('/');
  const pathName = parts[1];
  const categoryId = parts[2];

  const categories = useAppSelector(selectCategories);
  const productOne = useAppSelector(selectProductOne);
  const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getCategoryPath = (categoryID: string) => {
      const category = categories.find((item) => item.ID === categoryID);
      return category ? category.name : '';
    };

    const generateBreadcrumbs = () => {
      if (pathName === 'products' && categoryId) {
        const categoryPath = getCategoryPath(categoryId);
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            fontWeight={'bold'}
            key="2"
            href={`/products/${categoryId}`}
          >
            {categoryPath ? categoryPath : 'Категория'}
          </Link>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'product' && productOne) {
        const categoryPath = getCategoryPath(productOne.ownerID);
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="2"
            href={`/products/${productOne.ownerID}`}
          >
            {categoryPath ? categoryPath : 'Категория'}
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            {productOne.name}
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'productsNews') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Новинки
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'delivery') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Доставка
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (location.pathname === '/') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'contacts') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Контакты
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'about') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            О нас
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'my-cabinet') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Личный кабинет
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'login') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Вход
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'register') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Регистрация
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'search-results') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Результат поиска:
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'basket') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Корзина
          </span>,
        ];
        setBreadcrumbs(state);
      } else if (pathName === 'order') {
        const state = [
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
            Главная
          </Link>,
          <Link
            sx={{
              '&:hover': {
                color: '#f6c011', // Цвет кнопки при наведении
              },
              textDecoration: 'none',
            }}
            key="2"
            href="/basket"
          >
            Корзина
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            Оформление заказа
          </span>,
        ];
        setBreadcrumbs(state);
      } else {
        // Если не находимся в категории или продукте, сбрасываем крошки
        setBreadcrumbs([]);
      }
    };

    generateBreadcrumbs();
  }, [pathName, categoryId, categories, productOne, location.pathname]);

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Breadcrumbs sx={{ color: '#9f885f' }} separator="›" aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) =>
            // Добавляем свойство color к компоненту Link
            React.cloneElement(breadcrumb, { key: index, color: '#ddbe86' }),
          )}
          {/*{breadcrumbs}*/}
        </Breadcrumbs>
      </Box>
    </>
  );
};

export default BreadcrumbsPage;
