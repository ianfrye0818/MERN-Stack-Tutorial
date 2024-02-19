//library imports
import { Request, Response } from 'express';
//custom imports
import User from '../models/userModel';
//type imports

//get all users
async function getAllUsers(req: Request, res: Response) {
  try {
    //find all the users from the db
    let exisitngUsers = await User.find();
    //if no users are found, send a 404 status code
    if (!exisitngUsers) {
      res.status(404).json({ message: 'No users found' });
    }
    //remove the password from the user data and send to client
    const users = exisitngUsers.map((user) => {
      const { password, ...others } = user.toJSON();
      return others;
    });
    //send the user data to the client
    res.status(201).json(users);
  } catch (error) {
    //send a 500 status code if an error occurs
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//get single user
async function getUser(req: Request, res: Response) {
  try {
    //extract user id from the request
    const { id } = req.params;
    //find the user from the db
    const exisitingUser = await User.findById({ id });
    //if no user is found, send a 404 status code

    if (exisitingUser) {
      //remove the password from the user data and send to client
      const { password, ...others } = exisitingUser.toJSON();
      //send the user data to the client
      res.status(201).json(others);
    } else {
      //if no user found send a 404 status code
      res.status(404).json({ message: 'No user found' });
    }
  } catch (error) {
    //send a 500 status code if an error occurs
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//check if admin before deleting user
//delete user
async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    //delete the user from the db
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      //if no user found send a 404 status code
      res.status(404).json({ message: 'No user found' });
    }
    //send message to client that user was deleted successfully
    res.status(201).json({ message: 'User deleted successfully' });
  } catch (error) {
    //send a 500 status code if an error occurs
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

//TODO: check to see if jwt is valid before modifying user data
//TODO check if user is admin, manager, or user trying to modify their own data
//TODO: if not current user or admin or manager send 403 code
//patch a user
async function patchUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    //update the user in the db
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    //send the updated user data to the client
    if (updatedUser) {
      //extract password from user object
      const { password, ...others } = updatedUser.toJSON();
      //send updated user to client
      res.status(201).json(others);
    } else {
      //if no user found send a 404 status code
      res.status(404).json({ message: 'No user found' });
    }
  } catch (error) {
    //catch any errors
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  }
}

export { getAllUsers, getUser, deleteUser, patchUser };
