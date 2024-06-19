import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import imgHeader from '../../../assets/images/logoAbout/kludiImg/main.jpg';
import img1 from '../../../assets/images/logoAbout/kludiImg/1.jpg';
import img2 from '../../../assets/images/logoAbout/kludiImg/2.jpg';
import img3 from '../../../assets/images/logoAbout/kludiImg/3.jpg';
import img4 from '../../../assets/images/logoAbout/kludiImg/4.jpg';
import logo from '../../../assets/images/logoAbout/kludi.png';

const Kludirak = () => {
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
              KLUDI
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Компания KLUDI основана в 1926 году в г. Менден, Германия. Это почти 100 лет опыта в проектировании и
              производстве высочайшего качества смесителей для ванной комнаты и кухни. В соответствии с нашим стандартом
              качества: „Water in Perfection“
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
            <Typography variant="body1" fontWeight={'bolder'} gutterBottom textTransform={'uppercase'}>
              Специализированный производитель смесителей с 1926 г.
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Мы прекрасно владеем нашим ремеслом, потому что концентрируемся на том, что делаем лучше всего: на
              развитии и производстве высочайшего качества смесителей для умывальника, душа, ванны и кухонных моек. На
              нашем счету около 170 изобретений, 100 патентов и 1000 проектных образцов.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 1 }}>
            <Typography variant="h4" gutterBottom textTransform={'uppercase'}>
              Почему KLUDI
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Одним из ключевых сильных аргументов в пользу KLUDI является высочайшее качество изготовления. На всех
              предприятиях KLUDI контроль качества осуществляется на каждом этапе производства. При производств
              смесителей контролю качества подвергается каждая партия латуни. В случае обнаружения брака вся партию
              возвращается поставщику. Старательно выбираемые материалы высочайшего качества экологически чистые и
              надежные – несомненно, являются залогом успеха компании и доверия клиентов. После механической обработки
              отверстий производится первая проверка герметичности корпуса. Это способствует тому, что на последующие
              производственые процессы поступают только прошедшие тест корпуса. Применение надежных керамических
              картриджей, нескручивающихся шлангов, аэраторов из пластмассы, конических гаек, ограничителей расхода воды
              делает продукты KLUDI надежными, долговечными и экономными.
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
              Оцененные инновации
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Инновация присутствует в том случае, когда она упрощает работу – в соответствии с этим девизом мы создаем
              решения для ванной комнаты и кухни. Нашей целью является улучшение пользовательских свойств наших
              продуктов и упрощение пользования ними. Именно поэтому компания KLUDI была удостоена титула Самый
              инновационный бренд в конкурсе Plus X Awards в 2019 г.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Kludirak;
