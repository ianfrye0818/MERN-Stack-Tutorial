//library imports
import { Request, Response } from 'express';
//custom imports
import Workout from '../models/workoutModel';
//type imports
import { CustomRequest } from '../types/index';

// get all workouts
async function getAllWorkouts(req: Request, res: Response) {
  try {
    const workouts = await Workout.find();
    if (!workouts) {
      res.status(404).json({ message: 'No workouts found' });
    }
    res.status(201).json(workouts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//get all of users workouts
async function getAllUserWorkouts(req: Request, res: Response) {
  try {
    const userId = (req as CustomRequest).user.id;
    const workouts = await Workout.find({ user: userId });
    if (!workouts) {
      res.status(404).json({ message: 'No workouts found' });
    }
    res.status(201).json(workouts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//get single workout
async function getWorkout(req: Request, res: Response) {
  try {
    const workoutId = req.params.id;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      res.status(404).json({ message: 'No workout found' });
    }
    res.status(201).json(workout);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//create new workout
async function createWorkout(req: Request, res: Response) {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    console.log(workout);
    res.status(201).json(workout);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//delete workout
async function deleteWorkout(req: Request, res: Response) {
  try {
    const workoutId = req.params.id;
    const workout = await Workout.findByIdAndDelete(workoutId);
    if (!workout) {
      res.status(404).json({ message: 'No workout found' });
    }
    res.status(201).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//patch a workout
async function patchWorkout(req: Request, res: Response) {
  try {
    const workoutId = req.params.id;
    const workout = await Workout.findByIdAndUpdate(workoutId, req.body);
    if (!workout) {
      res.status(404).json({ message: 'No workout found' });
    }
    res.status(201).json({ message: 'Workout updated successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

export {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  patchWorkout,
  getAllUserWorkouts,
};
