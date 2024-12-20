import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { Unit } from '../../types';
import { fetchPostById, fetchPosts } from '../thunks/posts/fetchPosts';

export interface PostsState {
  data: Unit[];
  selectedPost: Unit;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: PostsState = {
  data: [],
  selectedPost: {} as Unit,
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, _) => {
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

    builder.addCase(fetchPostById.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedPost = action.payload as Unit;
    });

    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { selectPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
