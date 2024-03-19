import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/authSlice';
import { cartReducer } from './features/cartSlice';
import { productsReducer } from './features/productsSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { userReducer } from './features/userSlice';

const persistConfig = {
  key: 'happyStore',
  blacklist: ['products'],
  storage,
};

const reducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  products: productsReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // reducer: {
  //   auth: authReducer,
  //   products: productsReducer,
  //   cart: cartReducer,
  //   user: userReducer,
  // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
