import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchUserById, fetchUsers } from '../thunks/users/fetchUsers';
import { User } from '../../../types';

export interface UsersState {
  data: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: UsersState = {
  data: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
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
    builder.addCase(fetchUserById.pending, (state, action) => {
      state.isLoading = true;
      console.log('im loading');
    });

    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<User | undefined>) => {
        state.isLoading = false;
        console.log('im from slice', action.payload);
        state.selectedUser = action.payload!;
      }
    );

    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error as SerializedError;
    });
  },
});

export const { selectUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
