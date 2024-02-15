//library imports
import express from 'express';

//custom imports
import {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  patchWorkout,
} from '../controllers/workoutController';

//global variables
const router = express.Router();

//routes
router.get('/', getAllWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.patch('/:id', patchWorkout);
router.delete('/:id', deleteWorkout);

export default router;
