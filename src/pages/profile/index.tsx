import Navbar from '../../components/nav/navbar';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import Footer from '../../components/footer';

const ProfileIndex = () => {
  return (
    <ProtectedRoute>
      <div className='max-w-[90%] mx-auto'>
        <Navbar />
        <main className='my-6'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ProfileIndex;
