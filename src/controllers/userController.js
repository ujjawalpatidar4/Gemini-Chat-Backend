// User controller: profile info
import { getUserById } from '../models/user.js';
import express from 'express';
import { create, list, get, sendMessage } from '../controllers/chatroomController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { cacheChatroomsMiddleware } from '../middlewares/cache.js';
import { rateLimitMiddleware } from '../middlewares/rateLimit.js';
import axios from 'axios';

const router = express.Router();

// GET /user/me
export const getMe = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, mobile: user.mobile, subscription_tier: user.subscription_tier });
  } catch (err) { next(err); }
};

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, cacheChatroomsMiddleware, list);
router.get('/:id', authMiddleware, get);
router.post('/:id/message', authMiddleware, rateLimitMiddleware, sendMessage);


export default router;
