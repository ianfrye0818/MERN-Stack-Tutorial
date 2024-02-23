//library imports
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
};

export default function Signin() {
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data: FormDataType) =>
      await axios.post('http://localhost:3000/api/auth/login', data),
  });

  async function onSubmit(data: FormDataType) {
    try {
      const userInfo: AxiosResponse<User> = await mutation.mutateAsync(data);
      if (!userInfo) throw new Error('An error occured');
      setUser(userInfo.data);

      navigate('/workouts');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occured');
        console.error(error);
      }
    }
    reset();
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
          <Button className='bg-red-600 hover:bg-red-700 rounded-md p-3 text-white'>Sign In</Button>
          {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
          <p className='self-start'>
            Need an account?{' '}
            <Link
              className='text-blue-700 underline hover:text-blue-800'
              to='/signup'
            >
              Sign Up
            </Link>
          </p>
        </form>
      </main>
    </Layout>
  );
}
