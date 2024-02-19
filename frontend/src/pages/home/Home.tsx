import { useState } from 'react';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface WorkoutInterface {
  title: string;
  description?: string;
  reps?: number;
  sets?: number;
  weight?: number;
  rest?: number;
  date: Date;
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function Home() {
  const [date, setDate] = useState(Date.now());
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // function onSubmit(data: WorkoutInterface) {
  //   console.log(data);
  // }

  return (
    <form className='flex flex-col gap-3 max-w-[800px] mx-auto mt-7'>
      <TextField
        variant='outlined'
        id='title'
        label='Title'
        // {...register('title', { required: true })}
      />
      {/* {errors.title && <p className='text-sm text-red-500'>This field is required</p>} */}
      <TextField
        variant='outlined'
        id='description'
        label='Description'
        // {...register('description')}
      />
      <TextField
        variant='outlined'
        id='reps'
        label='Reps'
        type='number'
        // {...register('reps')}
      />
      <TextField
        variant='outlined'
        id='sets'
        label='Sets'
        type='number'
        // {...register('sets')}
      />
      <TextField
        variant='outlined'
        id='weight'
        label='Weight'
        type='number'
        // {...register('weight')}
      />
      <TextField
        variant='outlined'
        id='rest'
        label='Rest'
        type='number'
        // {...register('rest')}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Date'
          value={date}
          onChange={(newValue) => setDate(newValue!)}
        />
      </LocalizationProvider>
      <Button
        type='submit'
        variant='contained'
      >
        Submit
      </Button>
    </form>
  );
}
