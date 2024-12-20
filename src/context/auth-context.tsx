import { User } from '../types';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { setUser, useAppDispatch, useAppSelector } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextProps {
  currentUser: User;
  isAuthorized: boolean;
  isOwner: (userId: string) => boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const isOwner = (userId: string) => {
    return currentUser.id === userId;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            username: user.displayName,
            photoURL: user.photoURL,
          })
        );
        setIsAuthorized(true);
      } else {
        dispatch(setUser({}));
        setIsAuthorized(false);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthorized, isOwner }}>
      {children}
    </AuthContext.Provider>
  );
};
