import { useEffect } from 'react';
import { fetchPosts, useAppDispatch, useAppSelector } from '../store';
import Listing from './listing';
import cn from 'classnames';

interface UnitListProps {
  sm?: boolean;
}

const UnitList = ({ sm }: UnitListProps) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.data);

  useEffect(() => {
    dispatch(fetchPosts());
    console.log('is it fetching?', posts);
  }, []);

  return (
    <div className={cn({ 'grid grid-cols-2 gap-2': sm })}>
      {posts.map((post) => {
        return <Listing key={post.id} post={post} user={post.user} />;
      })}
    </div>
  );
};

export default UnitList;
