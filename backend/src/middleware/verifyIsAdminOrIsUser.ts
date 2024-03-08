import { CustomRequest } from '../types';
import { Request, Response, NextFunction } from 'express';
import Workout from '../models/workoutModel';

export async function verifyisAdminOrisUser(req: Request, res: Response, next: NextFunction) {
  const workoutUser = await Workout.findById(req.params.id);
  if (
    (req as CustomRequest).user.isAdmin ||
    (req as CustomRequest).user.id === workoutUser?.user.toString()
  ) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
}
