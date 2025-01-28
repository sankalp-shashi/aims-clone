import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { sendOTP } from '../controllers/mailOtpController.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login (now supports roles: Student, Instructor, Admin)
router.post('/login', login);

// Route for user logout
router.post('/logout', logout);

// Route to send OTP for login
router.post('/sendOTP', sendOTP);

export { router as authRouter };
