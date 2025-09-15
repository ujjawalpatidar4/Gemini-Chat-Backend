// Auth routes
import express from 'express';
import { signup, sendOTP, verifyOTP, forgotPassword, changePassword } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', authMiddleware, changePassword);

export default router;
