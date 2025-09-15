// Chatroom routes
import express from 'express';
const router = express.Router();
import { create, list, get, sendMessage } from '../controllers/chatroomController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { cacheChatroomsMiddleware } from '../middlewares/cache.js';
import { rateLimitMiddleware } from '../middlewares/rateLimit.js';

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, cacheChatroomsMiddleware, list);
router.get('/:id', authMiddleware, get);
router.post('/:id/message', authMiddleware, rateLimitMiddleware, sendMessage);

export default router;
