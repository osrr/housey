import { Outlet, useNavigate } from 'react-router-dom';

const AuthIndex = () => {
  const navigate = useNavigate();

  return (
    <div className='relative h-[100vh] flex items-center justify-center'>
      <button
        onClick={() => navigate('/')}
        className='cursor-pointer absolute top-10 left-10'
      >
        <h1 className='text-2xl font-bold'>Housey</h1>
      </button>
      <Outlet />
    </div>
  );
};

export default AuthIndex;
