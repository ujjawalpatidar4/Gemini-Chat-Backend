// Subscription status controller
// GET /subscription/status
export const getStatus = async (req, res, next) => {
  try {
    res.json({ subscription_tier: req.user.subscription_tier });
  } catch (err) { next(err); }
};

