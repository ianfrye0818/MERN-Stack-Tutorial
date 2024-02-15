//library imports
import express from 'express';
//custom imports
import { registerUser, loginUser, logoutUser } from '../controllers/authControllers';
//global variables
const router = express.Router();

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

export default router;
