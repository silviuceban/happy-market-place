import React, { useCallback, useEffect, useState } from 'react';
import '../App.css';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {
  loginThunk,
  selectIsError,
  selectIsLoading,
  selectIsLoggedIn,
} from '../store/features/authSlice';
import { LoginData } from '../services/api/authService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import succesfulLogin from '../assets/images/tick.png';
import { httpService } from '../services/httpService';
import { useAuth0 } from '@auth0/auth0-react';

const styles = {
  topLevelBox: {
    display: 'flex',
    flexDirection: 'column',
    mt: 10,
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 30,
    color: 'text.primary',
    mb: 5,
  },
  input: {
    mb: 3,
    height: 50,
    width: 220,
  },
  btn: {
    m: 2,
  },

  successfulLoginText: {
    textAlign: 'center',
    color: 'success.main',
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default function LoginPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const [invalidCredentialsError, setInvalidCredentialsError] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const domain = 'dev-g10af3b2ljs4f5f1.us.auth0.com';
  // const audience = 'http://localhost:5000/';
  // const scope = 'read:products';
  // const clientId = 'W9u1h7iL0OlL6FcrTEJItAWym4JVaghD';
  // const responseType = 'code';
  // const redirectUri = 'http://localhost:3000/challanges';
  const { loginWithRedirect, logout } = useAuth0();
  const login = useCallback(async () => {
    loginWithRedirect();
  }, [loginWithRedirect]);
  const logoutFn = useCallback(async () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }, []);

  const onSubmit = async (data: FieldValues): Promise<void> => {
    const username: string = data.username;
    const password: string = data.password;
    const dataToBeSent: LoginData = { username, password };

    await dispatch(loginThunk(dataToBeSent));
  };

  useEffect(() => {
    if (isError && !isLoggedIn) {
      setInvalidCredentialsError(true);
    }
    if (isLoggedIn) {
      setShowWelcome(true);
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }
  }, [isError, isLoggedIn]);

  const handleCloseError = useCallback(() => {
    setInvalidCredentialsError(false);
  }, [invalidCredentialsError]);

  return (
    <Box sx={styles.topLevelBox}>
      <button onClick={login}>login</button>
      <button onClick={logoutFn}>logout</button>
      {/* {showWelcome ? (
        <Stack spacing={5}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={succesfulLogin}
              className="successfulLogin"
              alt="Successful Login"
            />
          </Box>
          <Box>
            <Typography
              sx={styles.successfulLoginText}
              className="successfulLoginText"
            >
              Welcome to Happy Store!
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Box>
          <Typography sx={styles.title}>Login</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={styles.form}>
              <TextField
                label="User name"
                variant="standard"
                sx={styles.input}
                required
                {...register('username', { required: true })}
                error={!!errors?.username}
                helperText={!!errors?.username ? 'User name required!' : ''}
              />
              <TextField
                label="Password"
                variant="standard"
                sx={styles.input}
                required
                {...register('password', { required: true })}
                error={!!errors?.password}
                helperText={!!errors?.password ? 'Password required!' : ''}
              />
              {isLoading && !isLoggedIn ? (
                <CircularProgress />
              ) : (
                <Button type="submit" variant="contained" sx={styles.btn}>
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Box>
      )}

      <Snackbar
        open={invalidCredentialsError}
        autoHideDuration={5000}
        onClose={handleCloseError}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{
            width: '100%',
          }}
        >
          Invalid login or password
        </Alert>
      </Snackbar> */}
    </Box>
  );
}
