import Layout from '../../components/Layout';
import WorkoutCard from '../../components/ui/WorkoutCard';

export default function Workout() {
  return (
    <Layout>
      <main className='container p-2 min-h-[calc(100vh-80px)] mx-auto flex flex-col gap-4'>
        <h1 className='text-center text-3xl text-gray-500 '>Workouts</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
        </div>
      </main>
    </Layout>
  );
}
