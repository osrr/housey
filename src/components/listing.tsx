import { FaBath, FaHeart, FaRegHeart, FaTrash, FaUser } from 'react-icons/fa';
import { IoIosBed, IoIosMenu, IoMdPin } from 'react-icons/io';
import { PiCheckerboardFill } from 'react-icons/pi';
import { Unit } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import {
  DropdownAction,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
  DropdownShelf,
} from './dropdown-menu';
import { MdEdit } from 'react-icons/md';
import { firebaseDeleteDoc } from '../helpers';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface ListingProps {
  post: Unit;
}

const Listing = ({ post }: ListingProps) => {
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.auth);

  const owner = (userId: string): boolean => {
    return userId === post.user.userId;
  };

  const isLiked = (): boolean => {
    console.log('currentUser:', currentUser);
    console.log('currentUser.liked:', currentUser?.liked);
    console.log('post.id:', post?.id);

    return (
      Array.isArray(currentUser?.liked) && currentUser.liked.includes(post.id)
    );
  };

  const handleUnlike = async (postId: string) => {
    try {
      const userRef = doc(db, 'users', currentUser.id);

      // Remove the postId from the 'liked' array in Firestore
      await updateDoc(userRef, {
        liked: arrayRemove(postId),
      });

      console.log('User unliked a post!!');
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const userRef = doc(db, 'users', currentUser.id);

      // Update the 'liked' array in Firestore using arrayUnion
      await updateDoc(userRef, {
        liked: arrayUnion(postId), // Adds the postId to the array if it doesn't already exist
      });

      console.log('User liked a post!!');
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  const handleDelete = async (postId: string) => {
    await firebaseDeleteDoc('units', postId);

    location.reload();
  };

  return (
    <div className='rounded-md min-w-[300px] max-w-[300px] p-2 border border-transparent hover:border-black/5 hover:shadow-md transition duration-200'>
      <div className='relative'>
        {owner(currentUser.id) ? (
          <DropdownMenu
            trigger={
              <button className='bg-white absolute right-[10px] top-[10px] p-2 rounded-full'>
                <IoIosMenu className='w-5 h-5' />
              </button>
            }
            className='left-[50%] right-[50%] top-[50px]'
          >
            <DropdownLabel>Post Actions</DropdownLabel>
            <DropdownShelf>
              <DropdownAction
                onClick={() => navigate(`/profile/edit-post/${post.id}`)}
                icon={MdEdit}
              >
                Edit
              </DropdownAction>
              <DropdownSeparator />
              <DropdownAction
                onClick={() => handleDelete(post.id)}
                className='text-red-500'
                icon={FaTrash}
              >
                Delete
              </DropdownAction>
            </DropdownShelf>
          </DropdownMenu>
        ) : (
          <button
            className='absolute top-[10px] right-[10px] bg-white rounded-full p-2'
            onClick={() =>
              isLiked() ? handleUnlike(post.id) : handleLike(post.id)
            }
          >
            {isLiked() ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
        <div className='w-full h-[200px]'>
          <img
            src={
              post?.images.length > 0
                ? post?.images[0]?.url
                : 'https://picsum.photos/400/300'
            }
            alt='listing'
            className='rounded-md w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='flex flex-col items-start gap-1'>
        <div className='flex items-center justify-between w-full pr-2'>
          <h1 className='text-xl font-semibold'>{post.title}</h1>
          <button
            className='text-xs hover:text-primary'
            onClick={() => navigate(`/unit/${post.id}`)}
          >
            view details
          </button>
        </div>
        <div className='flex items-center gap-1'>
          <IoMdPin className='w-5 h-5 text-gray-500' />
          <p className='text-gray-400'>
            {post?.location?.city} {post?.location?.address}
          </p>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-1'>
            <IoIosBed className='w-4 h-4 text-green-700' />
            <p className='text-gray-400 text-sm'>{post.beds} Bds</p>
          </div>
          <div className='flex items-center gap-1'>
            <FaBath className='w-4 h-4 text-green-700' />
            <p className='text-gray-400 text-sm'>{post.baths} Bath</p>
          </div>
          <div className='flex items-center gap-1'>
            <PiCheckerboardFill className='w-4 h-4 text-green-700' />
            <p className='text-gray-400 text-sm'>{post.sqft} Sqft</p>
          </div>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='border rounded-full w-8 h-8 flex items-center justify-center'>
            {post.user.photoURL ? (
              <img
                src={post.user.photoURL}
                alt='avatar'
                className='w-full h-full object-cover rounded-full'
              />
            ) : (
              <FaUser className='text-gray-300' />
            )}
          </div>
          <p className='font-semibold text-sm'>{post.user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
