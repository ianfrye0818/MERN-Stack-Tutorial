import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from '../../components/Layout';
import WorkoutCard from '../../components/ui/WorkoutCard';
import { WorkoutDB } from './add-a-workout/AddAWorkout';
import { Link } from 'react-router-dom';

export default function Workout() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['workouts'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/api/workouts');
      return data as WorkoutDB[];
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || data.length === 0) return <p>No workouts found</p>;

  return (
    <Layout>
      <main className='container p-2 min-h-[calc(100vh-80px)] mx-auto flex flex-col gap-4'>
        <div className=' container flex justify-between items-center'>
          <h1 className='text-center text-3xl text-gray-500 '>Workouts</h1>
          <Link
            to={'/workouts/add-a-workout'}
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
