import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { Unit } from '../../../types';
import { fetchPosts } from '../thunks/posts/fetchPosts';

export interface PostsState {
  data: Unit[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: PostsState = {
  data: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload as Unit[];
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const postsReducer = postsSlice.reducer;
