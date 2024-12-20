import { useNavigate } from 'react-router-dom';
import UnitList from '../../components/unit-list';
import Hero from '../../components/hero';
import { fetchPosts, useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';

const Root = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(({ posts }) => posts.data);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Hero />
      <section>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Featured Listing</h1>
          <button onClick={() => navigate('/units')}>view all</button>
        </div>
        <div className='flex items-center overflow-x-auto py-2 gap-4'>
          <UnitList ascending posts={posts} />
        </div>
      </section>
      <section className='mt-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Recommended for you</h1>
          <button onClick={() => navigate('/units')}>view all</button>
        </div>
        <div className='flex items-center gap-3 overflow-x-auto py-2'>
          <UnitList posts={posts} />
        </div>
      </section>
    </>
  );
};

export default Root;
