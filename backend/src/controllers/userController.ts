//library imports
import mongoose from 'mongoose';
import { Request, Response } from 'express';
//custom imports
import User from '../models/userModel';

//TODO: create acutal controller functions

//create a user
async function createUser(req: Request, res: Response) {
  try {
    res.json({ message: 'create user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get all users

async function getAllUsers(req: Request, res: Response) {
  try {
    res.json({ message: 'get all users' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get single user
async function getUser(req: Request, res: Response) {
  try {
    res.json({ message: 'get single user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//delete user
async function deleteUser(req: Request, res: Response) {
  try {
    res.json({ message: 'delete user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//patch a user
async function patchUser(req: Request, res: Response) {
  try {
    res.json({ message: 'patch user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createUser, getAllUsers, getUser, deleteUser, patchUser };
