/* eslint-disable react/jsx-no-bind */ // different number of hooks to be rendered whether user is logged in or not
import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, ListItemButton, Typography } from '@mui/material';
import logo from '../assets/images/logoHmp.png';
import MenuIcon from '@mui/icons-material/Menu';
import { routerElements } from '../routing';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../store';
import { CartIcon } from './CartIcon';
import { useAuth0 } from '@auth0/auth0-react';

const styles = {
  btn: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
  },
  drawer: {
    backgroundColor: 'secondary.main',
    color: 'secondary.contrastText',
  },
  navbar: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    with: '100%',
    height: 60,
    position: 'sticky',
    top: '0px',
    zIndex: '1',

    pl: 1,
  },
};

export default function Menu(): JSX.Element {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const login = useCallback(async () => {
    loginWithRedirect();
  }, []);

  const toggleDrawer =
    (toOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(toOpen);
    };

  return (
    <Box sx={styles.navbar}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={logo}
          sx={{ mr: 1.5, cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        />
        <Typography
          sx={{ fontSize: 18, cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        >
          Happy Store
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CartIcon />
        <Button onClick={toggleDrawer(true)} sx={styles.btn}>
          <MenuIcon />
        </Button>
      </Box>

      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: styles.drawer,
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {/* <ListItemButton
              onClick={() => {
                navigate('/');
              }}
            >
              <ListItemText primary={'Home'} />
            </ListItemButton> */}
            {routerElements.map((element) => {
              // if (isAuthenticated && element.url !== '/login') {
              return (
                <ListItemButton
                  key={element.url}
                  onClick={() => {
                    navigate(element.url);
                  }}
                >
                  <ListItemText primary={element.label} />
                </ListItemButton>
              );
              // }
            })}

            {/* <ListItemButton
              onClick={() => {
                login();
              }}
            >
              <ListItemText primary={'Login'} />
            </ListItemButton> */}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
