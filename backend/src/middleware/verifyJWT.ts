//library imports
import { Request, Response, NextFunction } from 'express';
//custom imports
import TokenBlackList from '../models/tokenBlackListModel';
import { decodeToken } from '../utils/decodeToken';
//type imports
import { CustomRequest } from '../types';

//middleware to invalidate expired tokens and add them to the blacklist database collection
//interface to extend the Request interface to add id and isAdmin properties to the user object

//middleware to verify the token
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const blackListedToken = await TokenBlackList.findOne({ token });
  if (blackListedToken) {
    return res.status(401).json({ message: 'Token has been revoked' });
  }

  try {
    const decoded = decodeToken(token, process.env.JWT_SECRET!);
    (req as CustomRequest).user = decoded as CustomRequest['user'];

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
