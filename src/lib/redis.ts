import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.redis_mrizkyp_REDIS_URL;

declare global {
  // eslint-disable-next-line no-var
  var _redisClientPromise: Promise<RedisClientType> | undefined;
}

let redisClientPromise: Promise<RedisClientType>;

if (!redisUrl) {
  console.warn('redis_mrizkyp_REDIS_URL is not defined in environment variables.');
}

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

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
) {
  let redis;
  try {
    redis = await getRedisClient();
    if (redis.isReady) {
      const cached = await redis.get(key);
      if (cached) {
        return JSON.parse(cached) as T;
      }
    }
  } catch (err) {
    console.error(`Redis get error for key ${key}:`, err);
  }

  const data = await fetcher();

  try {
    if (redis && redis.isReady) {
      await redis.setEx(key, ttl, JSON.stringify(data));
    }
  } catch (err) {
    console.error(`Redis set error for key ${key}:`, err);
  }

  return data;
}
