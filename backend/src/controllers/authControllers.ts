import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import TokenBlackList from '../models/tokenBlackListModel';

// register user
//create a user
async function registerUser(req: Request, res: Response) {
  try {
    //check if user already exists in the db
    const { email } = req.body;
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await User.create(req.body);
    //create a jwt token
    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    //seperate the password from the data and send to client along with token
    const { password: pass, ...others } = newUser.toJSON();
    //send the user data and token to the client
    res.status(201).json({ ...others, token });
  } catch (error) {
    //send a 500 status code if an error occurs
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

// login user
async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    //check if user exists in the db
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, exisitingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    //create a jwt token
    const token = jwt.sign(
      { id: exisitingUser._id, isAdmin: exisitingUser.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
    //seperate the password from the data and send to client along with token
    const { password: pass, ...others } = exisitingUser.toJSON();
    //send the user data and token to the client
    res.status(201).json({ ...others, token });
  } catch (error) {
    //send a 500 status code if an error occurs
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}
// logout user
async function logoutUser(req: Request, res: Response) {
  try {
    //invalidate jwt token
    const token = req.headers.authorization?.split(' ')[1];
    //if there is no token send back a 401 status code
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    //blacklist the token
    await TokenBlackList.create({ token });
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

export { registerUser, loginUser, logoutUser };
