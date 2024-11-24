import { useNavigate } from 'react-router-dom';
import UnitList from '../../components/unit-list';

const Root = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Featured Listing</h1>
          <button onClick={() => navigate('/units')}>view all</button>
        </div>
        <div className='flex items-center gap-3 overflow-x-scroll py-2'>
          <UnitList />
        </div>
      </section>
      <section>
        <h1 className='text-2xl font-semibold'>Recommended for you</h1>
      </section>
    </main>
  );
};

export default Root;
