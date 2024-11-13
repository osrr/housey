import { FormEvent, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import { containsInvalidCharacters } from '../../helpers';
import { useThunk } from '../../hooks/use-thunk';
import { addUser } from '../../store';
import { NewUser } from '../../../types';
import Button from '../../components/Button';

const RegisterPage = () => {
  const [doAddUser, addUserLoading, addUserError] = useThunk(addUser);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vpassword, setVPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (containsInvalidCharacters(username)) {
      alert('username cannot contain invalid characters');
      return;
    }

    if (vpassword !== password) {
      alert('passwords written are different!!');
      return;
    }

    const newUser: NewUser = {
      id: '',
      username,
      email,
      password,
      photoURL: '',
      posts: [],
    };

    doAddUser(newUser);

    navigate('/', {
      replace: true,
    });
  };

  return (
    <main className='w-[512px] p-10'>
      <div className='mb-6 flex flex-col items-start gap-4'>
        <h1 className='text-2xl font-bold'>Create new account</h1>
        <p className='text-sm text-gray-400 '>
          Join Housey, and find out the latest deals on houses in your location
        </p>
      </div>
      <form className='grid grid-cols-4 gap-4' onSubmit={handleSubmit}>
        <Input
          label='Username'
          type='name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label='Verify Password'
          type='password'
          value={vpassword}
          onChange={(e) => setVPassword(e.target.value)}
          required
        />
        <div className='flex items-center gap-2 col-span-full'>
          <input type='checkbox' required />
          <p>
            I agree, to the{' '}
            <span className='text-primary font-bold hover:underline cursor-pointer'>
              terms
            </span>{' '}
            and{' '}
            <span className='text-primary font-bold hover:underline cursor-pointer'>
              conditions
            </span>
            !
          </p>
        </div>
        <Button primary>Create Account</Button>
      </form>
      <div className='my-4'>
        <div className='flex items-center gap-2'>
          <p>Already have an account?</p>
          <button
            className='text-primary font-semibold'
            onClick={() => navigate('/auth/sign')}
          >
            Sign In
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-full h-[1px] bg-gray-300' />
          <p className='mx-5 text-gray-500'>or</p>
          <div className='w-full h-[1px] bg-gray-300' />
        </div>

        <Button icon={FcGoogle} className='mt-4' iconClassName='w-5 h-5'>
          Google
        </Button>
      </div>

      <div>
        <h1>{addUserError}</h1>
      </div>
    </main>
  );
};

export default RegisterPage;
