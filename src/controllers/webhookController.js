// Stripe webhook controller
import { handleStripeWebhook } from '../services/stripeService.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /webhook/stripe
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    await handleStripeWebhook(event);
    res.status(200).send('Webhook received');
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

