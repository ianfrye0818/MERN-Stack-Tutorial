import { useState } from 'react';
import axios from 'axios';
import { startOfDay } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { ShadCnUIDatepicker } from '../../components/ui/ShadCnUIDatePicker';
import Layout from '../../components/Layout';

type WorkoutInterface = {
  title?: string;
  description?: string;
  reps?: number;
  sets?: number;
  weight?: number;
  rest?: number;
  date?: Date;
};

export default function Home() {
  const [date, setDate] = useState<Date>(startOfDay(new Date()));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data: WorkoutInterface) =>
      axios.post('http://localhost:3000/api/workouts', data).then((res) => console.log(res.data)),
  });

  function onSubmit(data: WorkoutInterface) {
    mutation.mutate({ ...data, date });
    reset();
  }
  return (
    <Layout>
      <main className='max-w-[800px] mx-auto h-[calc(100vh-80px)] flex flex-col gap-3 justify-center '>
        <h1 className='text-3xl text-gray-500'>Add a Workout</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
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
              {...register('description', { required: true })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='reps'>Reps</label>
            <Input
              type='number'
              id='reps'
              {...register('reps', { required: true })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='sets'>Sets</label>
            <Input
              type='number'
              id='sets'
              {...register('sets', { required: true })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='weight'>Weight</label>
            <Input
              type='number'
              id='weight'
              {...register('weight', { required: true })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='rest'>Rest</label>
            <Input
              type='number'
              id='rest'
              {...register('rest', { required: true })}
            />
          </div>
          <ShadCnUIDatepicker
            date={date}
            setDate={setDate}
          />
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
