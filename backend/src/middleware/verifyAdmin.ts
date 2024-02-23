import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types';
export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req as CustomRequest).user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
}
