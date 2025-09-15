// Auth controller: signup, send OTP, verify OTP, password reset
import { createUser, getUserByMobile, updateUserOTP, verifyUserOTP, updatePassword } from '../models/user.js';
import { generateOTP, hashPassword, comparePassword, generateToken } from '../services/authService.js';

// POST /auth/signup
const signup = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) return res.status(400).json({ error: 'Mobile and password required' });
    const existing = await getUserByMobile(mobile);
    if (existing) return res.status(409).json({ error: 'User already exists' });
    const passwordHash = await hashPassword(password);
    const user = await createUser(mobile, passwordHash);
    res.status(201).json({ user: { id: user.id, mobile: user.mobile } });
  } catch (err) { next(err); }
};

// POST /auth/send-otp
const sendOTP = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: 'Mobile required' });
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
    await updateUserOTP(mobile, otp, expiry);
    res.json({ mobile, otp }); // Mock: return OTP in response
  } catch (err) { next(err); }
};

// POST /auth/verify-otp
const verifyOTP = async (req, res, next) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });
    const user = await verifyUserOTP(mobile, otp);
    if (!user) return res.status(401).json({ error: 'Invalid OTP' });
    const token = generateToken(user);
    res.json({ token });
  } catch (err) { next(err); }
};

// POST /auth/forgot-password
const forgotPassword = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: 'Mobile required' });
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    await updateUserOTP(mobile, otp, expiry);
    res.json({ mobile, otp }); // Mock: return OTP in response
  } catch (err) { next(err); }
};

// POST /auth/change-password
const changePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Password required' });
    const passwordHash = await hashPassword(password);
    await updatePassword(req.user.id, passwordHash);
    res.json({ success: true });
  } catch (err) { next(err); }
};

export {
  signup,
  sendOTP,
  verifyOTP,
  forgotPassword,
  changePassword,
};

