// User model (PostgreSQL)
// Table: users
// Columns: id, mobile, password, otp, otp_expiry, subscription_tier, created_at

import { Pool } from 'pg';
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const createUser = async (mobile, passwordHash) => {
  const res = await pool.query(
    'INSERT INTO users (mobile, password, subscription_tier) VALUES ($1, $2, $3) RETURNING *',
    [mobile, passwordHash, 'basic']
  );
  return res.rows[0];
};

export const getUserByMobile = async (mobile) => {
  const res = await pool.query('SELECT * FROM users WHERE mobile = $1', [mobile]);
  return res.rows[0];
};

export const getUserById = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
};

export const updateUserOTP = async (mobile, otp, expiry) => {
  await pool.query('UPDATE users SET otp = $1, otp_expiry = $2 WHERE mobile = $3', [otp, expiry, mobile]);
};

export const verifyUserOTP = async (mobile, otp) => {
  const res = await pool.query('SELECT * FROM users WHERE mobile = $1 AND otp = $2 AND otp_expiry > NOW()', [mobile, otp]);
  return res.rows[0];
};

export const updatePassword = async (id, passwordHash) => {
  await pool.query('UPDATE users SET password = $1 WHERE id = $2', [passwordHash, id]);
};

export const updateSubscriptionTier = async (id, tier) => {
  await pool.query('UPDATE users SET subscription_tier = $1 WHERE id = $2', [tier, id]);
};

