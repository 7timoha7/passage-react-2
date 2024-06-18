import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import logo from '../../../assets/images/logoAbout/porcelain.png';
import imgHeader from '../../../assets/images/logoAbout/porcekentImg/mailn.jpeg';
import img1 from '../../../assets/images/logoAbout/porcekentImg/1.jpg';
import img2 from '../../../assets/images/logoAbout/porcekentImg/2.jpg';
import img4 from '../../../assets/images/logoAbout/porcekentImg/3.jpg';
import img3 from '../../../assets/images/logoAbout/porcekentImg/4.jpeg';

const Rakporcelain = () => {
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
            <Typography variant="h4" gutterBottom textTransform={'uppercase'}>
              Rak Porcelain
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              это бренд высококачественной посуды, предлагающий широкий ассортимент изделий, которые отличаются
              исключительной красотой, функциональностью и долговечностью. Благодаря своему мастерству и инновационным
              подходам, Rak Porcelain создает посуду, отвечающую самым высоким стандартам качества.
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
            {/*<Typography variant="h4" gutterBottom textTransform={'uppercase'}></Typography>*/}
            <Typography variant="body1" textTransform={'uppercase'}>
              Независимо от того, используется ли посуда Rak Porcelain для повседневного использования или для особых
              мероприятий, эта посуда всегда придает стиль и изысканность любому столу. Она идеально подходит для
              домашнего использования, а также для ресторанов, кафе и отелей, которые ценят качество и уникальность.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 1 }}>
            {/*<Typography variant="h4" gutterBottom textTransform={'uppercase'}></Typography>*/}
            <Typography variant="body1" textTransform={'uppercase'}>
              Rak Porcelain - это не только посуда, но и наследие, символ изящества и элегантности. Покупая продукцию
              этого бренда, вы получаете не только великолепную посуду, но и уникальный опыт истинно превосходного
              стола. Оставьте яркое впечатление на своих гостей и наслаждайтесь истинным искусством Rak Porcelain каждый
              день.
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
            <Typography variant="h6" gutterBottom textTransform={'uppercase'}>
              лучшие материалы
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Используя только лучшие материалы, такие как порошковая керамика и фарфор, Rak Porcelain создает изделия,
              которые не только красиво выглядят, но и прочны и устойчивы к повреждениям. Каждая деталь проходит
              тщательный контроль качества, чтобы обеспечить безупречное исполнение и надежность.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Rakporcelain;
