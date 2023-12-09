import { createTheme } from '@mui/material/styles';

const palette = {
  primary: { main: '#f57e60', contrastText: '#fff' },
  secondary: { main: '#9b5240', contrastText: '#fff', light: '#f7f8fb' },
  text: { primary: '#64453d' },
  white: { main: '#fff', contrastText: 'black' },
  success: { main: '#2e7d32' },
};

export const theme = createTheme({
  palette,
});
