// Message model (PostgreSQL)
// Table: messages
// Columns: id, chatroom_id, user_id, content, is_gemini, created_at

import { pool } from './user.js';

export const createMessage = async (chatroomId, userId, content, isGemini = false) => {
  const res = await pool.query(
    'INSERT INTO messages (chatroom_id, user_id, content, is_gemini) VALUES ($1, $2, $3, $4) RETURNING *',
    [chatroomId, userId, content, isGemini]
  );
  return res.rows[0];
};

export const getMessagesByChatroom = async (chatroomId) => {
  const res = await pool.query('SELECT * FROM messages WHERE chatroom_id = $1 ORDER BY created_at ASC', [chatroomId]);
  return res.rows;
};

