import Navbar from '../../components/nav/navbar';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../protected-route';

const ProfileIndex = () => {
  return (
    <ProtectedRoute>
      <div className='max-w-[90%] mx-auto'>
        <Navbar />
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default ProfileIndex;
