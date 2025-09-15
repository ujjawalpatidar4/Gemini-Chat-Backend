// Subscription controller: start Pro subscription
import { startProSubscription } from '../services/stripeService.js';

// POST /subscribe/pro
export const subscribePro = async (req, res) => {
  const userId = req.user.id;
  const url = await startProSubscription(userId);
  res.json({ url });
};

