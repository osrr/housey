import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('auth context must be used in wrapped children!');
  }

  return context;
};

export { useAuth };
