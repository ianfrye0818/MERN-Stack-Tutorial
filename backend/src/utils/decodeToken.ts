import jwt from 'jsonwebtoken';
//function to verify the token by decoding it
export function decodeToken(token: string, secretKey: string) {
  return jwt.verify(token, secretKey);
}
