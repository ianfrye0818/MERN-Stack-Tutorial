//library imports
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

//component imports
import Layout from '../../components/Layout';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

//hook imports
import { useUser } from '../../hooks/useUser';

//type imports
import { User } from '../../context/AuthProviderContext';

export type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const mutation = useMutation({
    mutationFn: async (data: FormDataType) => {
      const { email, password } = data;
      const userData = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        email,
        password,
      });
      return userData;
    },
  });

  async function onSubmit(data: FormDataType) {
    try {
      setErrorMessage('');
      if (data.password !== data.confirmPassword) throw new Error('Passwords do not match');
      const userInfo: AxiosResponse<User> = await mutation.mutateAsync(data);
      setUser(userInfo.data);
      reset();
      navigate('/workouts');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occured');
        console.error(error);
      }
    }
  }
  return (
    <Layout>
      <main className=' max-w-[500px] p-2 min-h-[calc(100vh-80px)] mx-auto flex flex-col gap-4 justify-center items-center'>
        <form
          className='w-full md:w-8/12 flex flex-col gap-3 md:border border-gray-300 p-4 rounded-md bg-white'
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        >
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            type='email'
            placeholder='Email'
            {...register('email', { required: true })}
          />
          {errors.email && <span className='text-red-500'>This field is required</span>}
          <label htmlFor='password'>Password</label>

          <Input
            id='password'
            type='password'
            placeholder='Password'
            {...register('password', { required: true })}
          />
          {errors.password && <span className='text-red-500'>This field is required</span>}
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            {...register('confirmPassword', { required: true })}
          />
          {errors.confirmPassword && <span className='text-red-500'>This field is required</span>}
          {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
          <Button className='bg-red-600 hover:bg-red-700 rounded-md p-3 text-white'>Sign Up</Button>
          <p className='self-start'>
            Already have an account?{' '}
            <Link
              className='text-blue-700 underline hover:text-blue-800'
              to='/signin'
            >
              Sign In
            </Link>
          </p>
        </form>
      </main>
    </Layout>
  );
}
