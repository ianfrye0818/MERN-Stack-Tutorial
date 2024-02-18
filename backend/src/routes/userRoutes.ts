//library imports
import express from 'express';
//custom imports
import { getAllUsers, getUser, deleteUser, patchUser } from '../controllers/userController';
import checkIsAdmin from '../middleware/checkIsAdmin';
import checkManagementRole from '../middleware/checkManagementRole';
//global variables
const router = express.Router();
//routes
router.get('/', checkIsAdmin, checkManagementRole, getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', patchUser);
router.delete('/:id', checkIsAdmin, deleteUser);

export default router;
