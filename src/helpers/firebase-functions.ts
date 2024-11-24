import { UploadedFile, User } from '../../types';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
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
