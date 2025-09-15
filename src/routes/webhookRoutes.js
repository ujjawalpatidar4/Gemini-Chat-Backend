// Stripe webhook routes
import express from 'express';
import { stripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// Stripe webhook route is now mounted directly in app.js with express.raw middleware

export default router;
