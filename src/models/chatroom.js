// Chatroom model (PostgreSQL)
// Table: chatrooms
// Columns: id, user_id, name, created_at

import { pool } from './user.js';

export const createChatroom = async (userId, name) => {
  const res = await pool.query(
    'INSERT INTO chatrooms (user_id, name) VALUES ($1, $2) RETURNING *',
    [userId, name]
  );
  return res.rows[0];
};

export const getChatroomsByUser = async (userId) => {
  const res = await pool.query('SELECT * FROM chatrooms WHERE user_id = $1', [userId]);
  return res.rows;
};

export const getChatroomById = async (id) => {
  const res = await pool.query('SELECT * FROM chatrooms WHERE id = $1', [id]);
  return res.rows[0];
};

