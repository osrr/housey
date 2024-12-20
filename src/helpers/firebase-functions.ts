import { UploadedFile, User } from '../../types';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const firebaseFetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as User),
  }));

  return users;
};

export const firebaseFetchUserById = async ({ userId }: { userId: string }) => {
  const querySnapshot = await getDoc(doc(db, 'users', userId));

  return { ...querySnapshot.data() } as User;
};

export const firebaseSetDoc = async <T extends DocumentData>(
  path: string,
  docId: string,
  newData: T
) => await setDoc(doc(db, path, docId), newData);

export const firebaseFetchDoc = async (path: string, docId: string) =>
  await getDoc(doc(db, path, docId));

export const firebaseFetchDocs = async (path: string) =>
  await getDocs(collection(db, path));

export const firebaseDeleteDoc = async (path: string, docId: string) =>
  await deleteDoc(doc(db, path, docId));

export const firebaseUploadPhotoAndGetURL = async (
  folderPath: string,
  image: File
) => {
  const imgRef = ref(storage, `${folderPath}/${image.name}`);

  try {
    const snapshot = await uploadBytes(imgRef, image);

    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.log('firebase upload photo function: ', error);
  }
};

export const firebaseUploadFiles = async (
  path: string,
  files: FileList | File[]
): Promise<UploadedFile[]> => {
  const uploadedFiles: UploadedFile[] = [];

  // Iterate over each file in the FileList
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      // Create a reference for the file in Firebase Storage
      const fileRef = ref(storage, `${path}/${file.name}`);

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(fileRef, file);

      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Add the file name and download URL to the uploadedFiles array
      uploadedFiles.push({ name: file.name, url: downloadURL });
    } catch (error) {
      console.error(`Error uploading file ${file.name}: ${error}`);
    }
  }

  return uploadedFiles;
};

export const firebaseUpdateDoc = async <T extends object>(
  path: string,
  docId: string,
  newData: T
) => {
  try {
    const ref = doc(db, path, docId);

    await updateDoc(ref, newData);
  } catch (e) {
    console.log('[UPDATE_DOC]', e);
  }
};

export const handleUnlike = async (postId: string, userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);

    // Remove the postId from the 'liked' array in Firestore
    await updateDoc(userRef, {
      liked: arrayRemove(postId),
    });

    console.log('User unliked a post!!');
  } catch (error) {
    console.error('Error unliking post:', error);
  }
};

export const handleLike = async (postId: string, userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);

    // Update the 'liked' array in Firestore using arrayUnion
    await updateDoc(userRef, {
      liked: arrayUnion(postId), // Adds the postId to the array if it doesn't already exist
    });

    console.log('User liked a post!!');
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

export const updateUserInfoInPosts = async (
  userId: string,
  updatedInfo: { username?: string; photoURL?: string; phone?: string }
) => {
  try {
    const postsRef = collection(db, 'units');
    const userPostsQuery = query(postsRef, where('user.userId', '==', userId));
    const userPostsSnapshot = await getDocs(userPostsQuery);

    const batch = writeBatch(db);

    userPostsSnapshot.forEach((doc) => {
      const postRef = doc.ref;
      batch.update(postRef, {
        'user.username': updatedInfo.username,
        'user.photoURL': updatedInfo.photoURL,
        'user.phone': updatedInfo.phone,
      });
    });

    await batch.commit();
    console.log('User info updated in all posts!');
  } catch (e) {
    console.error('Error updating posts:', e);
  }
};
