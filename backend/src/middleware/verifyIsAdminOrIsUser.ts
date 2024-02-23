import { CustomRequest } from '../types';
import { Request, Response, NextFunction } from 'express';

export function verifyisAdminOrisUser(req: Request, res: Response, next: NextFunction) {
  if ((req as CustomRequest).user.isAdmin || (req as CustomRequest).user.id === req.params.id) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
}
