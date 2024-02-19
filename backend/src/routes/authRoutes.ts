//library imports
import express from 'express';
//custom imports
import { registerUser, loginUser, logoutUser } from '../controllers/authControllers';
import { verifyToken } from '../middleware/verifyJWT';
//global variables
const router = express.Router();

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', verifyToken, logoutUser);

export default router;