import React, { useEffect } from 'react';
import './styles/style.css';
import { ThemeProvider } from '@mui/material';
import Menu from './components/Menu';
import { RouterItems } from './routing';
import { theme } from './styles/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { setGetNewAccessTokenFn, setToken } from './services/httpService';
import { setUser } from './store/features/userSlice';
import { useAppDispatch } from './store/hooks';

function App(): JSX.Element {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setGetNewAccessTokenFn(getAccessTokenSilently);
  }, [setGetNewAccessTokenFn, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((res) => {
        setToken(res);
      });
      dispatch(setUser(user));
    }
  }, [isAuthenticated, dispatch]);

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
