import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseFetchUsers } from '../../../helpers';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  try {
    const response = await firebaseFetchUsers();

    return response;
  } catch (e) {
    console.log('THUNK FETCH USERS ERROR:', e);
  }
});
