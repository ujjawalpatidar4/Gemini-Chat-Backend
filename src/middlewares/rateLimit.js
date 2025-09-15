// Rate limiting middleware for Basic tier users
import { client } from '../utils/redis.js';

export const rateLimitMiddleware = async (req, res, next) => {
  if (req.user.subscription_tier !== 'basic') return next();
  const key = `rate:${req.user.id}:${new Date().toISOString().slice(0,10)}`;
  let count = await client.get(key);
  count = count ? parseInt(count) : 0;
  if (count >= 10) {
    return res.status(429).json({ error: 'Daily message limit reached (Basic tier)' });
  }
  await client.set(key, count + 1, { EX: 86400 }); // 1 day expiry
  next();
};

