// Auth service: OTP generation, JWT, password hashing
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate a random 6-digit OTP
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Hash password
export const hashPassword = async (password) => await bcrypt.hash(password, 10);

// Compare password
export const comparePassword = async (password, hash) => await bcrypt.compare(password, hash);

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, mobile: user.mobile }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

