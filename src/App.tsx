import React from 'react';
import './styles/style.css';
import { ThemeProvider } from '@mui/material';
import Menu from './components/Menu';
import { RouterItems } from './routing';
import { theme } from './styles/styles';

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Menu />
        <RouterItems />
      </ThemeProvider>
    </>
  );
}

export default App;
