import { FaBath, FaRegHeart, FaUser } from 'react-icons/fa';
import { IoIosBed, IoMdPin } from 'react-icons/io';
import { PiCheckerboardFill } from 'react-icons/pi';
import { Unit, User } from '../../types';
import { IoMenu } from 'react-icons/io5';

interface ListingProps {
  post: Unit;
  user: User;
  isOwner?: boolean;
}

const Listing = ({ post, user, isOwner }: ListingProps) => {
  return (
    <div className='rounded-md min-w-[300px] max-w-[300px] p-2 border border-transparent hover:border-black/5 hover:shadow-md transition duration-200'>
      <div className='relative'>
        {isOwner ? (
          <div className='absolute top-[10px] right-[10px] text-white'>
            <IoMenu className='w-5 h-5' />
          </div>
        ) : (
          <button className='absolute top-[10px] right-[10px] bg-white rounded-full p-2'>
            <FaRegHeart />
          </button>
        )}
        <img
          src='https://picsum.photos/300/200'
          alt='listing'
          className='rounded-md'
        />
      </div>
      <div className='flex flex-col items-start gap-1'>
        <h1 className='text-xl font-semibold'>{post.label}</h1>
        <div className='flex items-center gap-1'>
          <IoMdPin className='w-5 h-5 text-gray-500' />
          <p className='text-gray-400'>
            {post.location.city} {post.location.address}
          </p>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-1'>
            <IoIosBed className='w-4 h-4 text-green-700' />
            <p className='text-gray-400 text-sm'>4 Bds</p>
          </div>
          <div className='flex items-center gap-1'>
            <FaBath className='w-4 h-4 text-green-700' />
            <p className='text-gray-400 text-sm'>2 Bath</p>
          </div>
          <div className='flex items-center gap-1'>
            <PiCheckerboardFill className='w-4 h-4 text-green-700' />
            <p className='text-gray-400 text-sm'>12 sqft</p>
          </div>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='border rounded-full w-8 h-8 flex items-center justify-center'>
            <FaUser className='text-gray-300' />
          </div>
          <p className='font-semibold text-sm'>{user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
