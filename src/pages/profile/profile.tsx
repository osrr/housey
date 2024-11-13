import { FaPhone, FaPlus, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/use-auth';
import { useParams } from 'react-router-dom';
import Action from '../../components/action';
import { IoMdMail } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { User } from '../../../types';
import { fetchPosts, useAppSelector } from '../../store';
import Listing from '../../components/listing';
import { useThunk } from '../../hooks/use-thunk';

const ProfilePage = () => {
  const [doFetchPosts, fetchPostsLoading, fetchPostsError] =
    useThunk(fetchPosts);
  const [user, setUser] = useState<User>({} as User);

  const { currentUser, isOwner } = useAuth();
  const params = useParams();

  const fetchedUser = useAppSelector((state) =>
    state.users.data.find((u) => u.id === params.id)
  );

  const fetchedPosts = useAppSelector((state) =>
    state.posts.data.filter((post) => post.userId === params.id)
  );

  const owner = () => (params.id && isOwner(params.id) ? true : false);

  useEffect(() => {
    if (owner()) {
      setUser(currentUser);
      console.log('what is user?', user);
      console.log(fetchedPosts);
    } else {
      setUser(fetchedUser as User);
    }

    doFetchPosts({});
  }, [currentUser, user]);

  return (
    <div className='mt-6'>
      <div className='flex flex-col items-center justify-center border p-2 rounded-md'>
        {user.photoURL ? (
          <img src={user.photoURL} alt='profile-photo' />
        ) : (
          <div className='border rounded-full w-[5rem] h-[5rem] flex items-center justify-center'>
            <FaUser className='w-8 h-8' />{' '}
          </div>
        )}
        <div className='mt-4 text-center'>
          <h1 className='text-xl font-bold'>{user.username}</h1>
          <h1 className='text-md text-gray-400 mt-2 font-semibold'>
            {user.email}
          </h1>
        </div>
        {owner() ? (
          <button className='my-6 border py-2 px-4 w-[60%] rounded-md border-primary text-primary font-semibold hover:bg-primary hover:text-white transition duration-200'>
            Edit Profile
          </button>
        ) : (
          <div className='flex items-center justify-center gap-4 mt-5'>
            <Action icon={FaPhone} label='Call' />
            <Action icon={IoMdMail} label='Message' />
          </div>
        )}
      </div>
      <section className='mt-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold'>Posts</h1>
          {owner() && (
            <button className='bg-primary text-white px-6 py-1.5 flex items-center justify-center rounded-md border border-primary hover:bg-transparent hover:text-primary transition duration-200'>
              <FaPlus />
            </button>
          )}
        </div>
        <div>
          {fetchedPosts.map((post) => {
            return (
              <Listing
                key={post.id}
                post={post}
                user={user}
                isOwner={owner()}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
