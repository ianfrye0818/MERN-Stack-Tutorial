//library imports
import { Request, Response } from 'express';
import mongoose from 'mongoose';
//custom imports
import Workout from '../models/workoutModel';

//TODO: create acutal controller functions

// get all workouts
async function getAllWorkouts(req: Request, res: Response) {
  try {
    res.json({ message: 'get all workouts' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get single workout
async function getWorkout(req: Request, res: Response) {
  try {
    res.json({ message: 'get single workout' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//create new workout
async function createWorkout(req: Request, res: Response) {
  try {
    res.json({ message: 'create new workout' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//delete workout
async function deleteWorkout(req: Request, res: Response) {
  try {
    res.json({ message: 'delete workout' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//patch a workout
async function patchWorkout(req: Request, res: Response) {
  try {
    res.json({ message: 'patch workout' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getAllWorkouts, getWorkout, createWorkout, deleteWorkout, patchWorkout };
