import mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register user
async function registerUser(req: Request, res: Response) {}
// login user
async function loginUser(req: Request, res: Response) {}
// logout user
async function logoutUser(req: Request, res: Response) {}

export { registerUser, loginUser, logoutUser };
