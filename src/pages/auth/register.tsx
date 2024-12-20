import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/form/input';
import { containsInvalidCharacters, isEmail } from '../../helpers';
import { useThunk } from '../../hooks/use-thunk';
import { addUser } from '../../store';
import { NewUser } from '../../types';
import Button from '../../components/custom-button';
import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import MaskInput from '../../components/form/mask-input';

const formSchema = zod
  .object({
    username: zod
      .string()
      .min(4, 'Username must be at least 4 letters')
      .refine(
        (value) => containsInvalidCharacters(value),
        'Username cannot contain special characters'
      ),
    email: zod
      .string()
      .refine((value) => isEmail(value), 'Invalid email format'),
    phone: zod.string().min(9, 'Phone number must be at least 9 numbers'),
    password: zod.string().min(6, 'Password must be at least 6 characters'),
    confirm: zod.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type FormData = zod.infer<typeof formSchema>;

const RegisterPage = () => {
  const [doAddUser] = useThunk(addUser);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const newUser: NewUser = {
      id: '',
      username: data.username,
      phone: `+971-${data.phone}`,
      email: data.email,
      password: data.password,
      photoURL: '',
      liked: [],
    };

    console.log('creating new user', newUser);

    doAddUser(newUser);
    setLoading(false);
  };

  return (
    <main className='w-[512px] p-10'>
      <div className='mb-6 flex flex-col items-start gap-4'>
        <h1 className='text-2xl font-bold'>Create new account</h1>
        <p className='text-sm text-gray-400 '>
          Join Housey, and find out the latest deals on houses in your location
        </p>
      </div>
      <form
        className='grid grid-cols-4 gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register('username')}
          label='Username'
          type='name'
          error={errors.username?.message}
        />
        <Input
          {...register('email')}
          label='Email'
          error={errors.email?.message}
        />
        <div className='w-full col-span-full'>
          <h1 className='text-sm font-semibold'>Phone</h1>
          <div className='flex items-center'>
            <div
              className={`border rounded-l-md h-full py-1.5 px-2 bg-gray-200 ${
                errors.phone ? 'border-red-500' : ''
              }`}
            >
              <h1>+971</h1>
            </div>
            <MaskInput
              mask='99-999-9999'
              value={getValues('phone')}
              onChange={(e) =>
                setValue('phone', e.target.value, { shouldValidate: true })
              }
              className={`border-r border-t border-b py-1.5 px-2 w-full rounded-r-md ${
                errors.phone ? 'border-red-500' : ''
              }`}
            />
          </div>
          {errors.phone && (
            <p className='text-red-500 text-sm'>{errors.phone.message}</p>
          )}
        </div>
        <Input
          {...register('password')}
          label='Password'
          type='password'
          error={errors.password?.message}
        />
        <Input
          {...register('confirm')}
          label='Verify Password'
          type='password'
          error={errors.confirm?.message}
        />
        <div className='flex items-center gap-2 col-span-full'>
          <input type='checkbox' />
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
        <Button primary disabled={loading}>
          Create Account
        </Button>
      </form>
      <div className='my-4'>
        <div className='flex items-center gap-2'>
          <p>Already have an account?</p>
          <button
            className='text-primary font-semibold'
            onClick={() => navigate('/auth/sign')}
            disabled={loading}
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
    </main>
  );
};

export default RegisterPage;
