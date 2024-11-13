import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../types';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {} as User,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = {
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        photoURL: action.payload.photoURL,
      };

      console.log(state.currentUser);
    },
    flushUser: (state, action) => {
      state.currentUser = {} as User;
    },
  },
});

export const { setUser, flushUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
