import Navbar from '../../components/nav/navbar';
import { Outlet } from 'react-router-dom';

const ProfileIndex = () => {
  return (
    <div className='max-w-[90%] mx-auto'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProfileIndex;
