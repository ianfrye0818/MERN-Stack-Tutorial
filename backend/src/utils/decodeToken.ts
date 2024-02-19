//library imports
import jwt from 'jsonwebtoken';

//custom imports

//type imports

//function to verify the token by decoding it
export function decodeToken(token: string, secretKey: string) {
  return jwt.verify(token, secretKey);
}
