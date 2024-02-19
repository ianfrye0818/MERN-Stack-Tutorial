import { useState } from 'react';
import axios from 'axios';
import { startOfDay } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { ShadCnUIDatepicker } from './ShadCnUIDatePicker';

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
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data: WorkoutInterface) => axios.post('http://localhost:3000/api/workouts', data),
  });

  function onSubmit(data: WorkoutInterface) {
    mutation.mutate({ ...data, date });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-3 max-w-[800px] mx-auto mt-7'
    >
      <TextField
        variant='outlined'
        id='title'
        label='Title'
        {...register('title', { required: true })}
      />
      {errors.title && <p className='text-sm text-red-500'>This field is required</p>}
      <TextField
        variant='outlined'
        id='description'
        label='Description'
        {...register('description')}
      />
      <TextField
        variant='outlined'
        id='reps'
        label='Reps'
        type='number'
        {...register('reps')}
      />
      <TextField
        variant='outlined'
        id='sets'
        label='Sets'
        type='number'
        {...register('sets')}
      />
      <TextField
        variant='outlined'
        id='weight'
        label='Weight'
        type='number'
        {...register('weight')}
      />
      <TextField
        variant='outlined'
        id='rest'
        label='Rest'
        type='number'
        {...register('rest')}
      />

      <ShadCnUIDatepicker
        date={date}
        setDate={setDate}
      />
      <Button
        type='submit'
        variant='contained'
      >
        Submit
      </Button>
    </form>
  );
}
