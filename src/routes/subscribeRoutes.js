// Subscription routes
import express from 'express';
const router = express.Router();
import { subscribePro } from '../controllers/subscribeController.js';
import { authMiddleware } from '../middlewares/auth.js';

router.post('/pro', authMiddleware, subscribePro);

export default router;
