import jwt from 'jsonwebtoken';

export function signToken(payload: any, secret: string, expiresIn: string) {
  return jwt.sign(payload, secret, { expiresIn });
}
