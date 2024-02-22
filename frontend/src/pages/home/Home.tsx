import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Layout>
      <main className='max-w-[800px] mx-auto h-[calc(100vh-80px)] flex flex-col gap-3 justify-center text-center'>
        <h1 className='text-3xl font-bold'>Welcome to the Workout Tracking App</h1>
        <p className='text-xl'>
          Please{' '}
          <Link
            className='underline text-blue-700'
            to={'signIn'}
          >
            Login
          </Link>{' '}
          to start tracking your workouts!
        </p>
      </main>
    </Layout>
  );
}
