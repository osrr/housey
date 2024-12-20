import {
  FaChevronLeft,
  FaDirections,
  FaEnvelope,
  FaHeart,
  FaPhone,
  FaRegHeart,
  FaShare,
} from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import SlideShow from '../../components/slide-show';
import Action from '../../components/action';
import Tabs from '../../components/tabs';
import { fetchPostById, useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { useThunk } from '../../hooks/use-thunk';
// import Select from '../../components/form/select';
import { handleLike, handleUnlike } from '../../helpers';

const Unit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [doFetchPostById, doFetchPostByIdLoading, doFetchPostByIdError] =
    useThunk(fetchPostById);

  const { selectedPost } = useAppSelector((state) => state.posts);
  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      doFetchPostById(params.id);
      console.log(selectedPost);
    }
  }, [dispatch, params.id]);

  const isLiked = (): boolean => {
    return (
      Array.isArray(currentUser?.liked) &&
      currentUser.liked.includes(selectedPost.id)
    );
  };

  let content;

  if (doFetchPostByIdLoading) {
    content = <div>Loading....</div>;
  }

  if (doFetchPostByIdError) {
    content = <div>error fetching post</div>;
  }

  if (selectedPost) {
    content = (
      <>
        <div className='relative h-[300px] md:h-[600px] aspect-video mx-auto'>
          {selectedPost?.images && (
            <SlideShow slides={selectedPost?.images.map((image) => image)} />
          )}
        </div>
        <div className='flex items-center gap-4 justify-center mt-4'>
          <Action
            icon={FaPhone}
            label='Call'
            iconClassName='text-green-600'
            labelClassName='text-gray-700 group-hover:text-gray-700'
          />
          <Action
            icon={FaEnvelope}
            label='Message'
            iconClassName='text-green-600'
            labelClassName='text-gray-700 group-hover:text-gray-700'
          />
          <Action
            icon={FaDirections}
            label='Direction'
            iconClassName='text-green-600'
            labelClassName='text-gray-700 group-hover:text-gray-700'
          />
          <Action
            icon={FaShare}
            label='Share'
            iconClassName='text-green-600'
            labelClassName='text-gray-700 group-hover:text-gray-700'
          />
        </div>

        <div className='flex justify-around mt-6 pt-2'>
          {selectedPost && (
            <Tabs
              tabs={[
                { label: 'Overview', value: selectedPost?.description },
                { label: 'Features', value: selectedPost?.title },
                { label: 'House Value', value: selectedPost.id }, // TODO: add price to unit
              ]}
            />
          )}
        </div>
        {/* <div className='w-full'>
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center text-xl font-semibold'>
              <p>{selectedPost.reviews?.length}</p>
              <span className='mx-2'>●</span>
              <h1>Reviews</h1>
            </div>
            <Select
              options={[
                { label: 'Top-rated', value: 0 },
                { label: 'Lowest-rated', value: 1 },
                { label: 'Latest-ratings', value: 2 },
              ]}
              wrapperClassName='max-w-[400px]'
              sm
            />
          </div>
        </div> */}
      </>
    );
  }

  return (
    <div className='max-w-[90%] mx-auto mt-2'>
      <div className='flex items-center justify-between mb-6'>
        <button
          className='flex items-center gap-2'
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
          back
        </button>
        <h1 className='text-2xl font-bold'>Details</h1>
        <div className='flex items-center gap-2'>
          <button
            onClick={() =>
              isLiked()
                ? handleUnlike(selectedPost.id, currentUser.id)
                : handleLike(selectedPost.id, currentUser.id)
            }
          >
            {isLiked() ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button>
            <IoShareOutline className='w-5 h-5' />
          </button>
        </div>
      </div>
      <>{content}</>
    </div>
  );
};

export default Unit;
