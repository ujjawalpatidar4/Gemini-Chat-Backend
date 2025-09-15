// Subscription status routes
import express from 'express';
import { getStatus } from '../controllers/subscriptionController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/status', authMiddleware, getStatus);

export default router;
