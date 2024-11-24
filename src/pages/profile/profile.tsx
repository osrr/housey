import { FaPhone, FaPlus, FaUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Action from '../../components/action';
import { IoMdMail } from 'react-icons/io';
import { useEffect } from 'react';
import {
  fetchPosts,
  fetchUserById,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import Listing from '../../components/listing';
import { useThunk } from '../../hooks/use-thunk';

const ProfilePage = () => {
  const [doFetchPosts] = useThunk(fetchPosts);
  const [doFetchUserById, userByIdLoading, userByIdError] =
    useThunk(fetchUserById);

  const dispatch = useAppDispatch();

  const params = useParams();

  const { currentUser } = useAppSelector((state) => state.auth);
  const { selectedUser } = useAppSelector((state) => state.users);

  const fetchedPosts = useAppSelector(({ posts }) => {
    return posts.data.filter((post) => post.user.userId === params.id);
  });

  const likedPosts = useAppSelector(({ posts }) => {
    if (!currentUser?.liked || !posts?.data) {
      return []; // Return an empty array if no data exists
    }

    return posts.data.filter((post) => currentUser.liked.includes(post.id));
  });

  const owner = () =>
    params.id && currentUser.id === params.id ? true : false;

  useEffect(() => {
    if (owner()) {
      dispatch(selectUser(currentUser));
      console.log('what is user?', selectedUser);
      console.log(fetchedPosts);
    } else {
      if (params.id) {
        doFetchUserById({ userId: params.id });
      }
    }

    doFetchPosts({});
    console.log(fetchedPosts);
  }, [currentUser, selectedUser]);

  let content;

  if (userByIdLoading) {
    content = <div>loading....</div>;
  }

  if (userByIdError) {
    content = <div>failed to fetch user</div>;
  }

  if (selectedUser) {
    content = (
      <>
        <div className='flex flex-col items-center justify-center border p-2 rounded-md'>
          {selectedUser.photoURL ? (
            <img src={selectedUser.photoURL} alt='profile-photo' />
          ) : (
            <div className='border rounded-full w-[5rem] h-[5rem] flex items-center justify-center'>
              <FaUser className='w-8 h-8' />{' '}
            </div>
          )}
          <div className='mt-4 text-center'>
            <h1 className='text-xl font-bold'>{selectedUser.username}</h1>
            <h1 className='text-md text-gray-400 mt-2 font-semibold'>
              {selectedUser.email}
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
            {fetchPosts.length > 1 ? (
              fetchedPosts.map((post) => {
                return <Listing key={post.id} post={post} />;
              })
            ) : (
              <p className='text-xl font-semibold text-gray-400 text-center mt-12'>
                You haven't posted any posts
              </p>
            )}
          </div>
        </section>
        <section className='mt-6'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-bold'>Liked Posts</h1>
          </div>
          <div>
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => {
                return <Listing key={post.id} post={post} />;
              })
            ) : (
              <p className='text-xl font-semibold text-gray-400 text-center mt-12'>
                You haven't liked any posts
              </p>
            )}
          </div>
        </section>
      </>
    );
  }

  return <div className='mt-6'>{content}</div>;
};

export default ProfilePage;
