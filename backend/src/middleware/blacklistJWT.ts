//library imoprts
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
//custom imports
import TokenBlackList from '../models/tokenBlackListModel';
import { decodeToken } from '../utils/decodeToken';
//type imports

//middleware to invalidate expired tokens and add them to the blacklist database collection

export async function checkExpiredToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) next();

  try {
    const decodedToken = decodeToken(token!, process.env.JWT_SECRET!) as JwtPayload;
    if (!decodedToken.exp) next();
    await TokenBlackList.create({ token });
    res.status(401).send({ message: 'Token has been expired and blacklisted' });
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid Token' });
  }
}
