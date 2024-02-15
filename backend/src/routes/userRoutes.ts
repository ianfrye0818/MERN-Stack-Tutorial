//library imports
import express from 'express';
//custom imports
import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  patchUser,
} from '../controllers/userController';
//global variables
const router = express.Router();
//routes
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);

export default router;
