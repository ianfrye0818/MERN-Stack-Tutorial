//library imports
import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { startOfDay } from 'date-fns';

//component imports
import Layout from '../../../components/Layout';
import DatePicker from '../../../components/ui/DatePicker';
import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

//type imports
import { WorkoutInterface } from '../../../types';
import { useUser } from '../../../hooks/useUser';

export default function Home() {
  const [date, setDate] = useState<Date>(startOfDay(new Date()));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: async (data: WorkoutInterface) =>
      await axios.post('http://localhost:3000/api/workouts', data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
  });

  async function onSubmit(data: WorkoutInterface) {
    // Add the date to the data object and userid
    await mutation.mutateAsync({ ...data, date, user: user?._id as string });

    // Invalidate the workouts query to refetch the data
    queryClient.invalidateQueries({ queryKey: ['workouts'] });

    // Reset the form
    reset();

    // Navigate to the workouts page
    navigate('/workouts');
  }

  return (
    <Layout>
      <main className='max-w-[800px] mx-auto h-[calc(100vh-80px)] flex flex-col gap-3 justify-center '>
        <h1 className='text-3xl text-gray-500'>Add a Workout</h1>
        <Link
          to='/workouts'
          className=' text-blue-500 underline'
        >
          {'Back to workouts'}
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          className='flex flex-col gap-3 w-full border border-gray-300 p-4'
        >
          <div className='flex flex-col'>
            <label htmlFor='title'>Title</label>
            <Input
              id='title'
              {...register('title', { required: true })}
            />
            {errors.title && <span className='text-red-500'>This field is required</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='description'>Description</label>
            <Textarea
              id='description'
              {...register('description')}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='reps'>Reps</label>
            <Input
              type='number'
              id='reps'
              {...register('reps')}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='sets'>Sets</label>
            <Input
              type='number'
              id='sets'
              {...register('sets')}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='weight'>Weight</label>
            <Input
              type='number'
              id='weight'
              {...register('weight')}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='rest'>Rest</label>
            <Input
              type='number'
              id='rest'
              {...register('rest')}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <label>Date:</label>
            <DatePicker
              date={date}
              setDate={setDate}
            />
          </div>
          <Button
            type='submit'
            className='w-1/2 self-center'
          >
            Submit
          </Button>
        </form>
      </main>
    </Layout>
  );
}
