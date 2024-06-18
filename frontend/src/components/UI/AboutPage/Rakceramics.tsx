import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import imgHeader from '../../../assets/images/logoAbout/rakImg/main.jpg';
import img1 from '../../../assets/images/logoAbout/rakImg/1.jpg';
import img2 from '../../../assets/images/logoAbout/rakImg/2.jpg';
import imgProfile1 from '../../../assets/images/logoAbout/rakImg/proFile1.jpg';
import imgProfile2 from '../../../assets/images/logoAbout/rakImg/proFile2.jpg';
import img3 from '../../../assets/images/logoAbout/rakImg/3.jpg';
import img4 from '../../../assets/images/logoAbout/rakImg/4.jpg';
import logo from '../../../assets/images/logoAbout/rak.png';

const Rakceramics = () => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            maxWidth: '500px',
            height: 'auto',
            margin: '20px auto',
            '@media (max-width:600px)': {
              width: '80%',
            },
          }}
        />
      </Box>
      <Box component="img" src={imgHeader} alt="Rak Ceramics Header" sx={{ width: '100%', height: 'auto' }} />
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography variant="h4" gutterBottom>
              ПОМОГАЕМ СОЗДАВАТЬ ИКОНЫ СТИЛЯ
            </Typography>
            <Typography variant="body1">
              В RAK CERAMICS ПОМОГАЕМ СОЗДАВАТЬ ИКОНЫ СТИЛЯ, ПОМОГАЕМ СОЗДАВАТЬ ЧУДЕСА, А НАША ПРОДУКЦИЯ ПРЕДСТАВЛЕНА В
              САМЫХ КУЛЬТОВЫХ ЗДАНИЯХ МИРА. МЫ ИЗВЕСТНЫ ШИРОКИМ АССОРТИМЕНТОМ ПРОДУКЦИИ И СПОСОБНОСТЬЮ СОЗДАВАТЬ СЕРИИ
              ПОД ЗАКАЗ КАК ДЛЯ МЕЛКИХ, ТАК И ДЛЯ КРУПНЫХ ПРОЕКТОВ, ЧТО ПОЗВОЛЯЕТ НАШИМ КЛИЕНТАМ ВОПЛОТИТЬ СВОИ ИДЕИ В
              ЖИЗНЬ.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box
              component="img"
              src={img1}
              alt="Left Side Image"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
            <Box
              component="img"
              src={img2}
              alt="Right Side Image"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
            <Typography variant="h4" gutterBottom>
              ВНИМАНИЕМ К ДЕТАЛЯМ
            </Typography>
            <Typography variant="body1">
              МЫ УВАЖАЕМ, МЫ ВДОХНОВЛЯЕМ, МЫ УЛУЧШАЕМ, МЫ ПОСТАВЛЯЕМ; СЕГОДНЯ, ЗАВТРА, ВНЕ ЗАВИСИМОСТИ ОТ АМБИЦИЙ, ВНЕ
              ЗАВИСИМОСТИ ОТ ВЫЗОВА, В RAK CERAMICS МЫ ПОЗАБОТИМСЯ О ВСЕХ ДЕТАЛЯХ, КРУПНЫХ ИЛИ МЕЛКИХ.
              <br />
              НАШ ЭНТУЗИАЗМ И ОПЫТ ВМЕСТЕ С ПРИСТАЛЬНЫМ ВНИМАНИЕМ К ДЕТАЛЯМ ПОЗВОЛЯЕТ НАМ ПРЕДОСТАВЛЯТЬ ШИРОКИЙ
              АССОРТИМЕНТ ИНТЕГРИРОВАННЫХ РЕШЕНИЙ В КЕРАМИКЕ, ЧТО ДАЕТ ВАМ СВОБОДУ ТВОРЧЕСТВА И ПРОСТОР ДЛЯ ВООБРАЖЕНИЯ.
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" sx={{ mt: 6 }}>
          ПРОФИЛЬ КОМПАНИИ
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Box component="img" src={imgProfile1} alt="Profile Image 1" sx={{ width: '100%', height: 'auto' }} />
          <Box component="img" src={imgProfile2} alt="Profile Image 2" sx={{ width: '100%', height: 'auto', mt: 2 }} />
        </Box>

        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 1 }}>
            <Box
              component="img"
              src={img3}
              alt="Block Left Image"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 2, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              МЫ ЯВЛЯЕМСЯ ОДНИМ ИЗ КРУПНЕЙШИХ КЕРАМИЧЕСКИХ БРЕНДОВ В МИРЕ.
            </Typography>
            <Typography variant="body1">
              СПЕЦИАЛИЗИРУЯСЬ НА НАСТЕННОЙ И ПОЛОВОЙ ПЛИТКЕ ИЗ КЕРАМИЧЕСКОГО ГРАНИТА И САНТЕХНИКЕ, МЫ ПРОИЗВОДИМ 118
              МИЛЛИОНОВ КВАДРАТНЫХ МЕТРОВ МЕТРОВ ПЛИТКИ И 5.7 МИЛЛИОНОВ ШТУК САНТЕХНИЧЕСКИХ ИЗДЕЛИЙ , 36 МИЛЛИОНОВ ШТУК
              ФАРФОРОВОЙ ПОСУДЫ И 2,6 МИЛЛИОНА ШТУК СМЕСИТЕЛЕЙ В ГОД НА НАШИХ 23 СОВРЕМЕННЫХ ЗАВОДАХ В ОБЪЕДИНЕННЫХ
              АРАБСКИХ ЭМИРАТАХ, ИНДИИ, БАНГЛАДЕШ И ЕВРОПЕ.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 1 }}>
            <Typography variant="h4" gutterBottom>
              КРУПНЕЙШИХ КЕРАМИЧЕСКИХ БРЕНДОВ В МИРЕ
            </Typography>
            <Typography variant="body1">
              ОСНОВАННАЯ В 1989 ГОДУ СО ШТАБ-КВАРТИРОЙ В ОБЪЕДИНЕННЫХ АРАБСКИХ ЭМИРАТАХ, МЫ ОБСЛУЖИВАЕМ КЛИЕНТОВ В БОЛЕЕ
              ЧЕМ 150 СТРАНАХ ЧЕРЕЗ СЕТЬ ОПЕРАЦИОННЫХ ЦЕНТРОВ НА БЛИЖНЕМ ВОСТОКЕ, В ЕВРОПЕ, АФРИКЕ, АЗИИ, СЕВЕРНОЙ И
              ЮЖНОЙ АМЕРИКЕ И АВСТРАЛИИ. В ГЛОБАЛЬНЫХ ОПЕРАЦИЯХ У НАС РАБОТАЕТ ОКОЛО 12 000 СОТРУДНИКОВ БОЛЕЕ ЧЕМ 40
              НАЦИОНАЛЬНОСТЕЙ.
              <br />
              МЫ ЯВЛЯЕМСЯ ПУБЛИЧНОЙ КОМПАНИЕЙ НА ФОНДОВОЙ БИРЖЕ АБУ-ДАБИ В ОБЪЕДИНЕННЫХ АРАБСКИХ ЭМИРАТАХ И НА ФОНДОВОЙ
              БИРЖЕ ДАККИ В БАНГЛАДЕШ, КАК ГРУППА С ГОДОВЫМ ОБОРОТОМ ОКОЛО 1 МИЛЛИАРДА ДОЛЛАРОВ США.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 2, md: 2 }}>
            <Box
              component="img"
              src={img4}
              alt="Block Right Image"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Rakceramics;
