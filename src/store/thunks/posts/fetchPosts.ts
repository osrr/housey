import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseFetchDoc, firebaseFetchDocs } from '../../../helpers';
import { Unit } from '../../../../types';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (_, { getState, rejectWithValue }) => {
    // @ts-expect-error type unknown
    const { posts } = getState();

    // if (posts.data.length > 0) {
    //   return posts.data;
    // }

    try {
      const response = await firebaseFetchDocs('units');
      const posts = response.docs.map((doc) => doc.data() as Unit);

      return posts;
    } catch (e) {
      console.log('FETCH_POSTS_ERROR', e);
      return rejectWithValue(e);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (postId: string) => {
    try {
      const response = await firebaseFetchDoc('units', postId);

      console.log('what is the post', response.data());

      return response.data() as Unit;
    } catch (e) {
      console.log('FETCH_POST_BY_ID', e);
    }
  }
);
