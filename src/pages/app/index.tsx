import { Outlet } from 'react-router-dom';
import Navbar from '../../components/nav/navbar';
import ProtectedRoute from '../protected-route';

const AppIndex = () => {
  return (
    <ProtectedRoute>
      <div className='relative max-w-[90%] mx-auto md:max-w-[680px]'>
        <Navbar search />
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default AppIndex;
