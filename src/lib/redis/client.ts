import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.redis_mrizkyp_REDIS_URL;

declare global {
  // eslint-disable-next-line no-var
  var _redisClientPromise: Promise<RedisClientType> | undefined;
}

if (!redisUrl) {
  console.warn('redis_mrizkyp_REDIS_URL is not defined in environment variables.');
}

let redisClientPromise: Promise<RedisClientType>;

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._redisClientPromise) {
    const client = createClient({
      url: redisUrl,
    });
    client.on('error', (err) => console.error('Redis Client Error', err));
    globalThis._redisClientPromise = client.connect() as Promise<RedisClientType>;
  }
  redisClientPromise = globalThis._redisClientPromise;
} else {
  const client = createClient({
    url: redisUrl,
  });
  client.on('error', (err) => console.error('Redis Client Error', err));
  redisClientPromise = client.connect() as Promise<RedisClientType>;
}

export async function getRedisClient() {
  return await redisClientPromise;
}

export default redisClientPromise;
