//library imports
import { Request, Response, NextFunction } from 'express';
//custom imports
import User from '../models/userModel';
//type imports
import { CustomRequest } from '../types/index';

export default async function checkManagementRole(req: Request, res: Response, next: NextFunction) {
  try {
    //check if user is an admin
    const currentUser = await User.findById((req as CustomRequest).user.id);
    if (
      !currentUser ||
      !(currentUser.role === 'manager' || currentUser.role === 'admin') ||
      !currentUser.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: 'Unauthorized. Managment Role or higher role required' });
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
