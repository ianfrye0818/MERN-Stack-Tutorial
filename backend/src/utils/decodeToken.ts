//library imports
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types';

//custom imports

//type imports

//function to verify the token by decoding it
export function decodeToken(token: string, secretKey: string) {
  const decoded = jwt.verify(token, secretKey);
  return decoded as CustomRequest['user'];
}
