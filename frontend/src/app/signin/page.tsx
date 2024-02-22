import Layout from '../../components/Layout';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export type FormDataType = {
  email: string;
  password: string;
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit<FormDataType>(data: FormDataType) {
    console.log(data);
  }
  return (
    <Layout>
      <main className=' max-w-[500px] p-2 min-h-[calc(100vh-80px)] mx-auto flex flex-col gap-4 justify-center items-center'>
        <form
          className='w-full md:w-8/12 flex flex-col gap-3 md:border border-gray-300 p-4 rounded-md bg-white'
          onSubmit={handleSubmit(onSubmit)}
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
