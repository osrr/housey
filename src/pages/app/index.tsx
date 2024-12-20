import { Outlet } from 'react-router-dom';
import Navbar from '../../components/nav/navbar';
import ProtectedRoute from '../protected-route';
import Footer from '../../components/footer';

const AppIndex = () => {
  return (
    <ProtectedRoute>
      <div
        id='index-container'
        className='relative container mx-auto px-4 min-h-screen grid grid-cols-1'
      >
        <Navbar search />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AppIndex;
