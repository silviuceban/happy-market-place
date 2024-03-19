import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { login, LoginData } from '../../services/api/authService';
import { removeToken, setToken } from '../../services/storageService';

export const loginThunk = createAsyncThunk<
  string,
  LoginData,
  { rejectValue: string }
>('auth/login', async (loginData, thunkApi) => {
  try {
    const token = await login(loginData);
    setToken(token);

    return token;
  } catch (err) {
    console.error(err);

    return thunkApi.rejectWithValue('Invalid credentials');
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  removeToken();

  return true;
});

export interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: null | unknown;
}

// const storageToken = getToken();

const initialState: AuthState = {
  // token: storageToken,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.token = null;
      })
      .addCase(loginThunk.fulfilled, (state, { payload: token }) => {
        state.isLoading = false;
        state.error = null;
        state.token = token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.token = null;
      });
  },
});

export const authReducer = authSlice.reducer;

// selectors
export const selectToken = (root: RootState): string | null => root.auth.token;

export const selectIsLoggedIn = (root: RootState): boolean => !!root.auth.token;

export const selectIsLoading = (root: RootState): boolean =>
  root.auth.isLoading;

export const selectIsError = (root: RootState): boolean => !!root.auth.error;
