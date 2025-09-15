// Stripe subscription service
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { updateSubscriptionTier } from '../models/user.js';

// Initiate Stripe Checkout for Pro subscription
export const startProSubscription = async (userId) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Pro Subscription' },
        unit_amount: 1000,
        recurring: { interval: 'month' }
      },
      quantity: 1
    }],
    success_url: 'https://yourapp.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://yourapp.com/cancel',
    metadata: { userId }
  });
  return session.url;
};

// Handle Stripe webhook events
export const handleStripeWebhook = async (event) => {
  if (event.type === 'checkout.session.completed') {
    const userId = event.data.object.metadata.userId;
    await updateSubscriptionTier(userId, 'pro');
  }
  // Add more event handling as needed
};

