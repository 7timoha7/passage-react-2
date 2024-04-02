import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { AccessTime, CheckCircleOutline, DirectionsCar, DoorFront, MonetizationOn } from '@mui/icons-material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const Delivery = () => {
  return (
    <>
      <Paper
        sx={{
          p: 3,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Правила доставки
        </Typography>
        <Divider />

        <List>
          <ListItem sx={{ '&:hover': { color: '#ddbe86' } }}>
            <ListItemIcon>
              <CheckCircleOutline sx={{ '&:hover': { color: '#ddbe86' } }} />
            </ListItemIcon>
            <ListItemText primary="Бесплатная доставка в пределах города" />
          </ListItem>

          <ListItem sx={{ '&:hover': { color: '#ddbe86' } }}>
            <ListItemIcon>
              <MonetizationOn sx={{ '&:hover': { color: '#ddbe86' } }} />
            </ListItemIcon>
            <ListItemText primary="Доставка за городской чертой - 40 сом за километр" />
          </ListItem>

          <ListItem sx={{ '&:hover': { color: '#ddbe86' } }}>
            <ListItemIcon>
              <DirectionsCar sx={{ '&:hover': { color: '#ddbe86' } }} />
            </ListItemIcon>
            <ListItemText primary="Доставка с понедельника по субботу" />
          </ListItem>

          <ListItem sx={{ '&:hover': { color: '#ddbe86' } }}>
            <ListItemIcon>
              <DoorFront sx={{ '&:hover': { color: '#ddbe86' } }} />
            </ListItemIcon>
            <ListItemText primary="Доставка осуществляется только до подезда или до ворот" />
          </ListItem>

          <ListItem sx={{ '&:hover': { color: '#ddbe86' } }}>
            <ListItemIcon>
              <AccessTime sx={{ '&:hover': { color: '#ddbe86' } }} />
            </ListItemIcon>
            <ListItemText primary="Прием заказов на доставку до 15:00, если позже то переносится на следующий рабочий день" />
          </ListItem>

          <ListItem sx={{ '&:hover': { color: '#ddbe86' } }}>
            <ListItemIcon>
              <AccessibilityNewIcon sx={{ '&:hover': { color: '#ddbe86' } }} />{' '}
            </ListItemIcon>
            <ListItemText primary="Клиенту нужно заранее позаботится о грузчиках. Водитель не занимается выгрузкой" />
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

export default Delivery;
