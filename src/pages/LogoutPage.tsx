import React, { useCallback, useState } from 'react';
import { Box, Button, Dialog, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 30,
    color: 'text.primary',
    mb: 5,
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'center',
    color: 'text.primary',
    mb: 5,
  },
  topLevelBox: {
    mt: 10,
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default function LogoutPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(logoutThunk());
    navigate('/');
  }, []);

  const goBack = useCallback(() => navigate(-1), []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const navigateHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <Box sx={styles.topLevelBox}>
      <Typography sx={styles.title}>Logout</Typography>
      <Typography sx={styles.subtitle}>Are you sure?</Typography>
      <Box sx={styles.btnBox}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Button variant="contained" onClick={logout}>
            Yes
          </Button>
          <Button variant="contained" onClick={goBack}>
            No
          </Button>
          <Button variant="contained" onClick={handleClickOpen}>
            Maybe
          </Button>
        </Stack>
        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ display: 'flex', p: 3, flexDirection: 'column' }}>
            <Typography sx={{ mb: 3 }}>
              C{"'"} mon... there is no such thing as too much shopping{')'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={navigateHome}>
                Indeed
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}
