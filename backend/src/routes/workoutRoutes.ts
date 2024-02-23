//library imports
import express from 'express';

//custom imports
import {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  patchWorkout,
  getAllUserWorkouts,
} from '../controllers/workoutController';
import isUser from '../middleware/isUser';
import { verifyToken } from '../middleware/verifyJWT';

//global variables
const router = express.Router();

//routes
router.get('/', getAllWorkouts);
router.get('/user/:id', verifyToken, isUser, getAllUserWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.patch('/:id', patchWorkout);
router.delete('/:id', deleteWorkout);

export default router;
