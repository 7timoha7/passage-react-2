import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import CallIcon from '@mui/icons-material/Call';

const ContactsPage = () => {
  const theme = useTheme();

  const handlePhoneClick = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  useEffect(() => {
    const apiKey = 'YOUR_API_KEY';

    const loadMap = (id: string, center: number[], popupContent: string, link: string) => {
      (window as any).DG.then(() => {
        const map = (window as any).DG.map(id, {
          center: center,
          zoom: 17, // Adjusted zoom level for closer view
        });

        const popup = (window as any).DG.popup(center).setContent(
          `${popupContent}<br><a href="${link}" target="_blank" rel="noopener noreferrer">Открыть в 2ГИС</a>`,
        );

        (window as any).DG.marker(center).addTo(map).bindPopup(popup).openPopup();
      });
    };

    const script = document.createElement('script');
    script.src = `https://maps.api.2gis.ru/2.0/loader.js?key=${apiKey}`;
    script.async = true;
    script.onload = () => {
      loadMap(
        'map1',
        [42.864777, 74.630775],
        `
          <strong>Passage - Матросова, 1/2</strong><br>
          График работы:<br>
          ПН-СБ: С 09:00 - 18:00<br>
          ВС: С 10:00 - 15:00<br>
          <strong>Телефоны:</strong><br>
          <a href="tel:+996997100500">0 997 100 500</a><br>
          <a href="tel:+996553100500">0 553 100 500</a>
        `,
        'https://2gis.kg/bishkek/firm/70000001059206763?m=74.630806%2C42.86478%2F17&utm_source=details&utm_medium=widget&utm_campaign=firmsonmap',
      );

      loadMap(
        'map2',
        [42.859199, 74.619065],
        `
          <strong>Passage - Кулатова, 8 — 2 этаж</strong><br>
          График работы:<br>
          ПН-СБ: С 09:00 - 18:00<br>
          ВС: С 10:00 - 16:00<br>
          <strong>Телефоны:</strong><br>
          <a href="tel:+996997100500">0 997 100 500</a>
        `,
        'https://2gis.kg/bishkek/firm/70000001061184205?m=74.619007%2C42.859134%2F17&utm_source=details&utm_medium=widget&utm_campaign=firmsonmap',
      );
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Box>
      <Typography sx={{ mt: '30px' }} variant="h4">
        КОНТАКТЫ
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: theme.spacing(2), mt: 2 }} direction="column">
        <Grid item xs={12} mt={2}>
          <Box
            sx={{
              textAlign: 'center',
              marginBottom: theme.spacing(2),
              height: '100%',
            }}
          >
            <Typography variant="h4" gutterBottom>
              <span style={{ fontWeight: 'bold' }}>Passage</span> - Матросова, 1/2
            </Typography>
            <Grid container justifyContent={'center'}>
              <Paper id="map1" sx={{ width: '100%', height: ['450px', '600px'], maxWidth: '900px' }}></Paper>
            </Grid>

            <Grid container direction="column" alignItems={'center'}>
              <Grid item sx={{ mt: 1.5 }}>
                <Typography variant={'h6'}>График работы:</Typography>
                <Typography sx={{ fontSize: '15px', mt: 1 }}>ПН-СБ: 09:00 - 18:00</Typography>
                <Typography sx={{ fontSize: '15px' }}>ВС: 10:00 - 15:00</Typography>
              </Grid>
              <Grid item sx={{ mt: 1.5 }}>
                <Typography variant={'h6'}>Телефоны:</Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    mt: 1,
                    color: '#000000',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { color: '#ad882c' },
                  }}
                  onClick={() => handlePhoneClick('+996997100500')}
                >
                  <CallIcon sx={{ mr: 0.7 }} />
                  +996 997 100500
                </Typography>
              </Grid>
              <Grid item sx={{ mt: 1.5 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: '#000000',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { color: '#ad882c' },
                  }}
                  onClick={() => handlePhoneClick('+996553100500')}
                >
                  <CallIcon sx={{ mr: 0.7 }} />
                  +996 553 100500
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Box
            sx={{
              textAlign: 'center',
              marginBottom: theme.spacing(2),
              height: '100%',
            }}
          >
            <Typography variant="h4" gutterBottom>
              <span style={{ fontWeight: 'bold' }}>Passage</span> - Кулатова, 8 — 2 этаж
            </Typography>
            <Grid container justifyContent={'center'}>
              <Paper
                id="map2"
                sx={{
                  width: '100%',
                  height: ['450px', '600px'],
                  maxWidth: '900px',
                }}
              ></Paper>
            </Grid>

            <Grid container direction="column" alignItems={'center'}>
              <Grid item sx={{ mt: 1.5 }}>
                <Typography variant={'h6'}>График работы:</Typography>
                <Typography sx={{ fontSize: '15px', mt: 1 }}>ПН-СБ: 09:00 - 18:00</Typography>
                <Typography sx={{ fontSize: '15px' }}>ВС: 10:00 - 16:00</Typography>
              </Grid>
              <Grid item sx={{ mt: 1.5 }}>
                <Typography variant={'h6'}>Телефоны:</Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    mt: 1,
                    color: '#000000',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { color: '#ad882c' },
                  }}
                  onClick={() => handlePhoneClick('+996997100500')}
                >
                  <CallIcon sx={{ mr: 0.7 }} />
                  +996 997 100500
                </Typography>
              </Grid>
              <Grid item sx={{ mt: 1.5 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: '#000000',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { color: '#ad882c' },
                  }}
                  onClick={() => handlePhoneClick('+996553100500')}
                >
                  <CallIcon sx={{ mr: 0.7 }} />
                  +996 553 100500
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactsPage;
