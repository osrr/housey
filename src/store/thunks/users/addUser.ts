import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewUser } from '../../../../types';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export const addUser = createAsyncThunk(
  'users/add',
  async (newUser: NewUser) => {
    try {
      const snapshot = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      if (snapshot.user) {
        await updateProfile(snapshot.user, {
          displayName: newUser.username,
          photoURL: newUser.photoURL,
        });

        await setDoc(doc(db, 'users', snapshot.user.uid), {
          id: snapshot.user.uid,
          email: snapshot.user.email,
          username: snapshot.user.displayName,
          photoURL: snapshot.user.photoURL,
          phone: newUser.phone,
          liked: newUser.liked,
        }).then(() => {});
      }
    } catch (e) {
      console.log('THUNK_ADD_USER_ERROR', e);
    }
  }
);
