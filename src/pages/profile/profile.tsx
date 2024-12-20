import { FaPhone, FaPlus, FaUser } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Action from '../../components/action';
import { IoMdMail } from 'react-icons/io';
import { useEffect, useState } from 'react';
import {
  fetchPosts,
  fetchUserById,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import Listing from '../../components/listing';
import { useThunk } from '../../hooks/use-thunk';
import Modal from '../../components/modal';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaX } from 'react-icons/fa6';
import ImageInput from '../../components/form/image-input';
import Input from '../../components/form/input';
import PhoneInput from '../../components/form/phone-input';
import Button from '../../components/button';
import {
  firebaseUpdateDoc,
  firebaseUploadPhotoAndGetURL,
  updateUserInfoInPosts,
} from '../../helpers';
import { User } from '../../types';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';

const imageFileSchema = z
  .custom<File>((file) => file instanceof File, 'Image is required')
  .refine((file) => file.type.startsWith('image/'), 'Must be an image')
  .refine((file) => file.size <= 5 * 1024 * 1024, 'Max size is 5MB');

const formSchema = z.object({
  photoURL: imageFileSchema.optional(),
  username: z.string().min(1),
  phone: z.string(),
});

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [doFetchPosts] = useThunk(fetchPosts);
  const [doFetchUserById, userByIdLoading, userByIdError] =
    useThunk(fetchUserById);

  const { currentUser } = useAppSelector((state) => state.auth);
  const { selectedUser } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

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
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        username: selectedUser.username,
        phone: selectedUser.phone,
      });
    }
  }, [selectedUser]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!auth.currentUser) {
      return;
    }

    try {
      let url;
      const newImage = data.photoURL;

      if (newImage) {
        url = await firebaseUploadPhotoAndGetURL('/users', newImage);
      }

      const updatedData: User = {
        ...currentUser,
        photoURL: url ? url : currentUser.photoURL,
        phone: data.phone ? data.phone : currentUser.phone,
        username: data.username ? data.username : currentUser.username,
      };

      await updateUserInfoInPosts(currentUser.id, {
        username: updatedData.username,
        phone: updatedData.phone,
        photoURL: updatedData.photoURL,
      });

      await updateProfile(auth.currentUser, {
        displayName: updatedData.username,
        photoURL: updatedData.photoURL
          ? updatedData.photoURL
          : auth.currentUser.photoURL,
      });
      await firebaseUpdateDoc('users', currentUser.id, updatedData);
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useAppDispatch();

  const params = useParams();

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

  let content;

  if (userByIdLoading) {
    content = <div>loading...</div>;
  }

  if (userByIdError) {
    content = <div>failed to fetch user</div>;
  }

  if (selectedUser) {
    content = (
      <>
        <div className='flex flex-col items-center justify-center border p-2 rounded-md col-span-full md:col-span-2 md:max-h-fit'>
          {selectedUser.photoURL ? (
            <div className='w-[5rem] h-[5rem] rounded-full border'>
              <img
                src={selectedUser.photoURL}
                alt='profile-photo'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
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
            <>
              <button
                onClick={() => setOpen(true)}
                className='my-6 border py-2 px-4 w-[60%] rounded-md border-primary text-primary font-semibold hover:bg-primary hover:text-white transition duration-200'
              >
                Edit Profile
              </button>
              {open && (
                <Modal
                  onClose={() => {
                    setOpen(false);
                    form.reset();
                  }}
                >
                  <div className='flex flex-col'>
                    <div className='flex items-center justify-between border-b mb-6 pb-2'>
                      <h1 className='text-2xl font-semibold'>Edit Profile</h1>
                      <button
                        onClick={() => {
                          setOpen(false);
                          form.reset();
                        }}
                      >
                        <FaX />
                      </button>
                    </div>
                    <form
                      className='grid grid-cols-4 gap-4'
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <ImageInput
                        images={
                          form.getValues('photoURL') !== undefined
                            ? [form.getValues('photoURL')].filter(
                                (file): file is File => file !== undefined
                              )
                            : []
                        }
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            form.setValue('photoURL', file, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        removeImage={() => {
                          form.reset({
                            photoURL: undefined,
                          });
                        }}
                      />
                      <Input {...form.register('username')} label='Username' />
                      <PhoneInput
                        value={form.getValues('phone')}
                        onChange={(e) => form.setValue('phone', e.target.value)}
                      />
                      <Button
                        primary
                        className='mt-8 col-span-1'
                        disabled={isLoading}
                      >
                        Update Profile
                      </Button>
                    </form>
                  </div>
                </Modal>
              )}
            </>
          ) : (
            <div className='flex items-center justify-center gap-4 mt-5'>
              <Action
                icon={FaPhone}
                label='Call'
                onClick={() => setCallModal(true)}
              />
              {callModal && (
                <Modal
                  onClose={() => setCallModal(false)}
                  className='h-fit top-[40%] translate-y-[-50%]'
                >
                  <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'>
                      Call {selectedUser.username}
                    </h1>
                    <button onClick={() => setCallModal(false)}>
                      <FaX />
                    </button>
                  </div>
                  <p className='flex items-center gap-4 mt-6'>
                    <span>
                      <FaPhone className='text-primary' />
                    </span>
                    <span>{selectedUser.phone}</span>
                  </p>
                </Modal>
              )}
              <Action
                icon={IoMdMail}
                label='Message'
                onClick={() => setCallModal(true)}
              />
            </div>
          )}
        </div>
        <div className='col-span-full md:col-span-6'>
          <section className='mt-6'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-bold'>Posts</h1>
              {owner() && (
                <button
                  onClick={() =>
                    navigate(`/profile/new-post/${currentUser.id}`)
                  }
                  className='bg-primary text-white px-6 py-1.5 flex items-center justify-center rounded-md border border-primary hover:bg-transparent hover:text-primary transition duration-200'
                >
                  <FaPlus />
                </button>
              )}
            </div>
            <div className='flex items-center flex-wrap'>
              {fetchPosts.length > 0 ? (
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
          {owner() && (
            <section className='mt-6'>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Liked Posts</h1>
              </div>
              <div className='flex items-center flex-wrap'>
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
          )}
        </div>
      </>
    );
  }

  return <div className='mt-6 grid grid-cols-8 gap-8'>{content}</div>;
};

export default ProfilePage;
