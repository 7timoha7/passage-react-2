import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/users/usersThunks';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../types';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  user: User;
  close?: () => void;
}

const UserMenu: React.FC<Props> = ({ user, close }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (path: string) => {
    handleClose();
    navigate(path);
    if (close) {
      close();
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    if (close) {
      await close();
    }
    await navigate('/');
  };

  return (
    <>
      <Grid container>
        <Button onClick={handleClick} color="inherit" sx={{ color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }} fontWeight="bold">{`${user.firstName} ${user.lastName}`}</Typography>
            <MenuIcon fontSize={'large'} />
          </div>
        </Button>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '8px',
              background: 'linear-gradient(90deg, rgba(64,64,64,1) 0%, rgba(159,159,159,1) 100%)',
            },
          },
        }}
      >
        <div>
          <MenuItem onClick={() => onMenuItemClick('/my-cabinet')} sx={{ color: 'white' }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            Мой профиль
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            Выйти
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default UserMenu;
