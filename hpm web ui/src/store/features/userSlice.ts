import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { User } from '@auth0/auth0-react';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;

// selectors

export const selectUser = (root: RootState): User | null => root.user.user;
