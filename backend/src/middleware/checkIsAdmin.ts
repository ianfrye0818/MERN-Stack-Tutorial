//library imports
import { Request, Response, NextFunction } from 'express';

//custom imports

//type imports
import { CustomRequest } from '../types/index';

//middleware to check if user is an admin
export default async function checkIsAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    //check if user is an admin
    if (!(req as CustomRequest).user.isAdmin) {
      return res.status(403).json({ message: 'You are not authorized to perform this action' });
    }
    next();
  } catch (error) {
    //send a 500 status code if an error occurs
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}
