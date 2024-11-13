import { Outlet } from 'react-router-dom';
import Navbar from '../../components/nav/navbar';

const AppIndex = () => {
  return (
    <div className='relative max-w-[90%] mx-auto md:max-w-[680px]'>
      <Navbar search />
      <Outlet />
    </div>
  );
};

export default AppIndex;
