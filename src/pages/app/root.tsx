import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FaUser } from 'react-icons/fa';

const units = [
  { label: '4 bedroom Saada Tower', location: 'Sharjah, Al Khan' },
  { label: '4 bedroom Saada Tower', location: 'Sharjah, Al Khan' },
  { label: '4 bedroom Saada Tower', location: 'Sharjah, Al Khan' },
  { label: '4 bedroom Saada Tower', location: 'Sharjah, Al Khan' },
  { label: '4 bedroom Saada Tower', location: 'Sharjah, Al Khan' },
  { label: '4 bedroom Saada Tower', location: 'Sharjah, Al Khan' },
];

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
          {units.map((unit, index) => {
            return <h1>hello</h1>;
          })}
        </div>
      </section>
      <section>
        <h1 className='text-2xl font-semibold'>Recommended for you</h1>
        <Button primary outline icon={FaUser}>
          Submit
        </Button>
      </section>
    </main>
  );
};

export default Root;
