import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseFetchUserById, firebaseFetchUsers } from '../../../helpers';

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (_, { getState, rejectWithValue }) => {
    // @ts-expect-error type unknown
    const { users } = getState();

    // if (users.data.length > 0) {
    //   return users.data;
    // }

    try {
      const response = await firebaseFetchUsers();

      return response;
    } catch (e) {
      console.log('THUNK FETCH USERS ERROR:', e);
      return rejectWithValue(e);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async ({ userId }: { userId: string }) => {
    try {
      const response = await firebaseFetchUserById({ userId });

      return response;
    } catch (e) {
      console.log('THUNK FETCH USERS ERROR:', e);
    }
  }
);
