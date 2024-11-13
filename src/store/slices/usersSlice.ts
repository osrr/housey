import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/users/fetchUsers';
import { User } from '../../../types';

export interface UsersState {
  data: User[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: UsersState = {
  data: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      console.log('im loading');
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log('im from slice', action.payload);
      state.data = action.payload as User[];
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error as SerializedError;
    });
  },
});

export const usersReducer = usersSlice.reducer;
