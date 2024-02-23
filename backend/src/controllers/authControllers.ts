//library imports
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

//custom imports
import User from '../models/userModel';
import TokenBlackList from '../models/tokenBlackListModel';
import { CustomRequest } from '../types';
import { generateTokens } from '../utils/generateTokens';
import { createUserAndTokens } from '../utils/createUserAndTokens';
import { decodeToken } from '../utils/decodeToken';
import { signToken } from '../utils/signToken';

//type imports

//register / create a user with tokens
async function registerUser(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const { user, token, refreshToken } = await createUserAndTokens(req.body);
    //seperate out the password and refresh tokens from the user object
    const { password: _, refreshTokens: __, ...userWithoutPasswordAndRefreshTokens } = user;

    res.status(201).json({ ...userWithoutPasswordAndRefreshTokens, token, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured while creating user' });
    }
  }
}

//login user and generate tokens
async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const { token, refreshToken } = await generateTokens(user.toJSON());
    await User.findByIdAndUpdate(user._id, { $addToSet: { refreshTokens: refreshToken } });
    //seperate password and refresh tokens from the user object
    const {
      password: _,
      refreshTokens: __,
      ...userWithoutPasswordAndRefreshTokens
    } = user.toJSON();
    res.status(200).json({ ...userWithoutPasswordAndRefreshTokens, token, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured during login' });
    }
  }
}

async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    const decoded = decodeToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the refresh token is in the user's list of refresh tokens
    if (!user.refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const token = signToken(
      { id: user._id, isAdmin: user.isAdmin, role: user.role },
      process.env.JWT_SECRET!,
      '1d'
    );

    // Return the new access token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}

// logout user
async function logoutUser(req: Request, res: Response) {
  try {
    //invalidate jwt token
    const token = req.headers.authorization?.split(' ')[1];
    const refreshToken = req.body.refreshToken;
    //if there is no token send back a 401 status code
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    //blacklist the token
    await TokenBlackList.create({ token });
    if (refreshToken) {
      await TokenBlackList.create({ token: refreshToken });
      await User.findByIdAndUpdate((req as CustomRequest).user.id, {
        $pull: { refreshTokens: refreshToken },
      });
    }
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    //send a 500 status code if an error occurs
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

export { registerUser, loginUser, logoutUser, refreshToken };
