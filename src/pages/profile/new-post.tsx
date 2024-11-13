import { FormEvent, useState } from 'react';
import Input from '../../components/input';
import { useThunk } from '../../hooks/use-thunk';
import { addPost } from '../../store';
import { Unit } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileNewPostPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [doAddUser, addUserLoading, addUserError] = useThunk(addPost);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost: Unit = {
      id: uuidv4(),
      label: title,
      description,
      location: {
        city,
        address,
      },
      info: {
        beds: {},
        baths: {},
        square_foot: {},
      },
      images: [],
      userId: params.id!,
    };

    doAddUser(newPost);

    navigate(`profile/${params}`);
  };

  return (
    <div className='mt-6'>
      <h1 className='text-2xl font-bold'>New Unit</h1>
      <form className='mt-6 grid grid-cols-4 gap-6' onSubmit={handleSubmit}>
        <p>TODO: ADD IMAGE INPUT</p>
        <Input
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='4 bedroom villa, duplex apartment...'
          required
        />
        <div className='col-span-full'>
          <label className='text-sm font-semibold'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border rounded-md w-full py-1.5 px-2'
            required
          />
        </div>
        {/* TODO: Change to select component */}
        <Input
          label='city'
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          label='address'
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          className='col-span-full bg-primary border border-primary rounded-md text-white font-semibold py-1.5 hover:text-primary hover:bg-transparent transition duration-200'
          disabled={addUserLoading}
        >
          Add new Unit
        </button>
      </form>
    </div>
  );
};

export default ProfileNewPostPage;
