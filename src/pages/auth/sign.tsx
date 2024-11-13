import { FormEvent, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import { containsInvalidCharacters } from '../../helpers';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Button from '../../components/Button';

const SignPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: move logic to redux/thunk
    if (containsInvalidCharacters(username)) {
      await signInWithEmailAndPassword(auth, username, password);

      navigate('/');
    } else {
      const q = query(
        collection(db, 'users'),
        where('username', '==', username)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert(`no account with the username ${username} is found!`);
        return;
      }

      const foundUser = querySnapshot.docs[0].data();

      await signInWithEmailAndPassword(auth, foundUser.email, password);

      navigate('/');
    }
  };

  return (
    <div className='w-[512px] p-10'>
      <main>
        <div className='mb-6 flex flex-col items-start gap-4'>
          <h1 className='text-2xl font-bold'>Sign in</h1>
          <p className='text-sm text-gray-400 '>
            Join Housey, and find out the latest deals on houses in your
            location
          </p>
        </div>
        <form className='grid grid-cols-4 gap-4' onSubmit={handleSubmit}>
          <Input
            label='Username or Email'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button primary>Sign In</Button>
        </form>
        <div className='my-4'>
          <div className='flex items-center gap-2'>
            <p>Don't have an account?</p>
            <button
              className='text-primary font-semibold'
              onClick={() => navigate('/auth/register')}
            >
              Register
            </button>
          </div>
          <div className='flex items-center justify-center'>
            <div className='w-full h-[1px] bg-gray-300' />
            <p className='mx-5 text-gray-500'>or</p>
            <div className='w-full h-[1px] bg-gray-300' />
          </div>

          <Button icon={FcGoogle} className='mt-4'>
            Google
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SignPage;
