// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBe4KOdRSnei0lSgjfhgfMQPrSisQNV8I4',
  authDomain: 'houses-e22d7.firebaseapp.com',
  projectId: 'houses-e22d7',
  storageBucket: 'houses-e22d7.firebasestorage.app',
  messagingSenderId: '428827322654',
  appId: '1:428827322654:web:7a1ad031c92c59b272c10f',
  measurementId: 'G-KYC2VZREL7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
// const analytics = getAnalytics(app);
