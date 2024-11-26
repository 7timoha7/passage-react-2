import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../../../App.css';
import { toolbarTobAndBottomColor } from '../../../styles';

const DrPluggin = () => {
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailsClick = () => {
    window.open(
      'https://wa.me/996553100500?text=Здравствуйте,%20я%20хочу%20связаться%20с%20вами!',
      '_blank',
      'noopener,noreferrer',
    );
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.47)',
        }}
      >
        <Card
          sx={{
            m: '10px',
            maxWidth: isMobile ? 340 : 800,
            padding: isMobile ? 2 : 3,
            background: toolbarTobAndBottomColor,
            color: '#fff',
            borderRadius: 4,
            boxShadow: 5,
            textAlign: 'center',
            position: 'relative',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          {/* Close icon in the top-right corner */}
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              color: '#fff',
              background: 'rgba(159,157,157,0.38)',
              '&:hover': {
                color: '#7c2a2a',
                background: '#9f9d9d',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <CardContent>
            <Typography
              sx={{
                fontSize: isMobile ? '13px' : '16px',
                textTransform: 'uppercase',
                marginTop: isMobile ? 1 : 0,
              }}
              className="montserrat-bold"
              component="div"
              gutterBottom
            >
              только 29 и 30 ноября
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '13px' : '16px',
                textTransform: 'uppercase',
              }}
              className="montserrat-bold"
              component="div"
              gutterBottom
            >
              черная пятница
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '29px' : '68px',
                textTransform: 'uppercase',
                marginTop: isMobile ? 0 : 2,
              }}
              className="montserrat-bold"
              component="div"
            >
              Скидки <br />
              <span
                style={{
                  fontSize: isMobile ? '18px' : '55px',
                  textTransform: 'uppercase',
                  marginTop: isMobile ? 0 : 2,
                }}
                className="montserrat-bold"
              >
                до
              </span>{' '}
              <span
                style={{
                  fontSize: isMobile ? '40px' : '95px',
                  textTransform: 'uppercase',
                  marginTop: isMobile ? 0 : 2,
                  fontWeight: 'bold',
                }}
              >
                40%
              </span>
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', marginTop: isMobile ? -2 : -1 }}>
            <Button
              onClick={handleDetailsClick}
              variant="outlined"
              sx={{
                color: '#fff',
                border: '3px solid #fff',
                fontWeight: 'bold',
                fontSize: isMobile ? '12px' : '16px',
                padding: isMobile ? '5px 10px' : '10px 20px',
                '&:hover': {
                  border: '3px solid #7c2a2a',
                },
              }}
            >
              Подробнее
            </Button>
          </CardActions>
        </Card>
      </Backdrop>
    </>
  );
};

export default DrPluggin;
