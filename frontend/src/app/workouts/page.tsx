import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from '../../components/Layout';
import WorkoutCard from '../../components/ui/WorkoutCard';
import { WorkoutDB } from '../../types/index';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function Workout() {
  const { user, isSignedIn } = useUser();
  const { isLoading, error, data } = useQuery({
    queryKey: ['workouts'],
    queryFn: async () => {
      if (isSignedIn === false) return;
      const url = `${import.meta.env.VITE_BASE_URL}/api/workouts/user/${user?._id}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return data as WorkoutDB[];
    },
    retry: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !data || data.length === 0)
    return (
      <Layout>
        <main className='flex flex-col h-[calc(100vh-80px)] w-full justify-center items-center gap-4'>
          <h1 className='text-4xl'>No workouts found</h1>
          <Link
            className='text-xl text-blue-600 underline'
            to={'add-a-workout'}
          >
            Click here to add a workout
          </Link>
        </main>
      </Layout>
    );

  return (
    <Layout>
      <main className='container p-2 min-h-[calc(100vh-80px)] mx-auto flex flex-col gap-4'>
        <div className=' container flex justify-between items-center'>
          <h1 className='text-center text-3xl text-gray-500 '>Workouts</h1>
          <Link
            to={'add-a-workout'}
            className='text-center text-blue-500 underline'
          >
            Add a workout
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {data.map((workout: WorkoutDB) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
}
