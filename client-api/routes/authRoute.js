import express from 'express';
import { registerUser, authenticateUser } from '../controller/authController.js';

const router = express.Router();

// Signup route
router.post('/signup', registerUser);

// Authentication route
router.post('/login', authenticateUser);

export default router;