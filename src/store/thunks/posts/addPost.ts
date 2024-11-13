import { createAsyncThunk } from '@reduxjs/toolkit';
import { Unit } from '../../../../types';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const addPost = createAsyncThunk('posts/add', async (newUnit: Unit) => {
  try {
    await setDoc(doc(db, 'units', newUnit.id), newUnit);

    const userRef = doc(db, 'users', newUnit.userId);

    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : {};

    const updatedPosts = Array.isArray(userData.posts)
      ? [...userData.posts, newUnit.id]
      : [newUnit.id];

    await updateDoc(userRef, { posts: updatedPosts });
  } catch (e) {
    console.log('ADD_UNIT_ERROR', e);
  }
});
