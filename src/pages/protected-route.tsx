import { ReactNode, useEffect } from 'react';
import { flushUser, setUser, useAppDispatch } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { doc, onSnapshot } from 'firebase/firestore';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);

        const unsubscribeFirestore = onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const fetchedUser: User = docSnapshot.data() as User;

            dispatch(
              setUser({
                id: user.uid,
                email: user.email,
                username: user.displayName,
                photoURL: user.photoURL,
                phone: fetchedUser.phone,
                liked: fetchedUser.liked,
              })
            );
          } else {
            console.warn('User document does not exist!');
          }
        });

        if (location.pathname.startsWith('/auth')) {
          navigate('/');
        }

        return () => unsubscribeFirestore();
      } else {
        dispatch(flushUser(null));
        if (location.pathname.startsWith('/auth')) {
          navigate(location.pathname);
        } else {
          navigate('/auth/sign');
        }
      }
    });

    // Clean up auth listener
    return () => unsubscribeAuth();
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
