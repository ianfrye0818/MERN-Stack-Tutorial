//library imports
import { Request, Response, NextFunction } from 'express';
//custom imports

//type imports
import { CustomRequest } from './verifyJWT';

//middleware to verify that the user is the one who is accessing their own data
export default async function isUser(req: Request, res: Response, next: NextFunction) {
  try {
    //check if user is the one accessing their own data
    if (req.params.id !== (req as CustomRequest).user.id) {
      return res
        .status(403)
        .json({ message: 'Unauthorized. User is not authorized to access this resource' });
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
