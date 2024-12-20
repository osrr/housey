import Listing from './listing';
import { Unit } from '../../types';

interface UnitListProps {
  ascending?: boolean;
  posts: Unit[];
}

const UnitList = ({ posts, ascending }: UnitListProps) => {
  if (ascending) {
    const sortedPosts = [...posts].sort((a, b) => {
      const d1 = new Date(a.createdAt);
      const d2 = new Date(b.createdAt);
      return d2.getTime() - d1.getTime();
    });

    return (
      <>
        {posts.length > 0 ? (
          sortedPosts.map((post) => {
            return <Listing key={post.id} post={post} />;
          })
        ) : (
          <h1 className='text-xl text-zinc-400 font-bold'>No posts found</h1>
        )}
      </>
    );
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <Listing key={post.id} post={post} />;
        })
      ) : (
        <h1 className='text-xl text-zinc-400 font-bold'>No posts found</h1>
      )}
    </>
  );
};

export default UnitList;
