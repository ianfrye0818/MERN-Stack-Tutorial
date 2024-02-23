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

//middleware imports
import isUser from '../middleware/isUser';
import { verifyToken } from '../middleware/verifyJWT';
import { verifyAdmin } from '../middleware/verifyAdmin';
import { verifyisAdminOrisUser } from '../middleware/verifyIsAdminOrIsUser';

//global variables
const router = express.Router();

//routes
router.get('/', verifyToken, verifyAdmin, getAllWorkouts);
router.get('/user/:id', verifyToken, isUser, getAllUserWorkouts);
router.get('/:id', verifyToken, verifyAdmin, getWorkout);
router.patch('/:id', verifyToken, verifyisAdminOrisUser, patchWorkout);
router.post('/', verifyToken, createWorkout);
router.delete('/:id', verifyToken, verifyisAdminOrisUser, deleteWorkout);

export default router;
