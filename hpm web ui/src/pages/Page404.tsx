import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Page404(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        // width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px',
      }}
    >
      <Typography>Page404</Typography>
    </Box>
  );
}
