import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

interface AuthState {
  currentUser: User;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  currentUser: {} as User,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = {
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        photoURL: action.payload.photoURL,
        phone: action.payload.phone,
        liked: action.payload.liked,
      } as User;

      state.isAuthorized = true;
      console.log(state.currentUser);
    },
    flushUser: (state, _) => {
      signOut(auth);
      state.currentUser = {} as User;
      state.isAuthorized = false;
    },
  },
});

export const { setUser, flushUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
