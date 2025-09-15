// Entry point for the server
import app from './app.js';
import { connectDB } from './utils/db.js';
import { connectRedis } from './utils/redis.js';
const PORT = process.env.PORT || 5000;

// Connect to DB and Redis, then start server
(async () => {
  await connectDB();
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
