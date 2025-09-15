// Redis connection utility
import redis from 'redis';
export let client;

export const connectRedis = async () => {
  if (!client) {
    client = redis.createClient({ url: process.env.REDIS_URL });
    await client.connect();
    console.log('Connected to Redis');
  }
};

