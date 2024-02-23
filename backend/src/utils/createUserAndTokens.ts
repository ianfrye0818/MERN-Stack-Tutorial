import User, { UserInterface } from '../models/userModel';
import { generateTokens } from './generateTokens';

export async function createUserAndTokens(userData: UserInterface) {
  const newUser = await User.create(userData);
  const { token, refreshToken } = await generateTokens(newUser.toJSON());
  await User.findByIdAndUpdate(newUser._id, { $addToSet: { refreshTokens: refreshToken } });
  return { user: newUser.toJSON(), token, refreshToken };
}
