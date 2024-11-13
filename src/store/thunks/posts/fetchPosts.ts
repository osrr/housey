import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseFetchDocs } from '../../../helpers';
import { Unit } from '../../../../types';

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  try {
    const response = await firebaseFetchDocs('units');
    const posts = response.docs.map((doc) => doc.data() as Unit);

    return posts;
  } catch (e) {
    console.log('FETCH_POSTS_ERROR', e);
  }
});
