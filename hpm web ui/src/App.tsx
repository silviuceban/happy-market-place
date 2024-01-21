import React, { useEffect } from 'react';
import './styles/style.css';
import { ThemeProvider } from '@mui/material';
import Menu from './components/Menu';
import { RouterItems } from './routing';
import { theme } from './styles/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { setToken } from './services/httpService';

function App(): JSX.Element {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((res) => {
        setToken(res);
      });
    }
  }, [isAuthenticated]);

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
