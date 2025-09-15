// Caching middleware for GET /chatroom (per user)
import { client } from '../utils/redis.js';

export const cacheChatroomsMiddleware = async (req, res, next) => {
  const key = `chatrooms:${req.user.id}`;
  const cached = await client.get(key);
  if (cached) {
    return res.json({ chatrooms: JSON.parse(cached), cached: true });
  }
  res.sendChatroomsToCache = async (chatrooms) => {
    await client.set(key, JSON.stringify(chatrooms), { EX: 600 }); // 10 min TTL
  };
  next();
};

