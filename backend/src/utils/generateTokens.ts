import { UserInterface } from '../models/userModel';
import { signToken } from './signToken';
export async function generateTokens(user: UserInterface) {
  const token = signToken(
    { id: user._id, isAdmin: user.isAdmin, role: user.role },
    process.env.JWT_SECRET!,
    '1d'
  );
  const refreshToken = signToken(
    { id: user._id, isAdmin: user.isAdmin, role: user.role },
    process.env.JWT_REFRESH_SECRET!,
    '30d'
  );

  if (!token || !refreshToken) throw new Error('Token creation failed');

  return { token, refreshToken };
}
