import redisClientPromise, { getRedisClient } from './client';
import { REDIS_PREFIX } from './config';

export { redisClientPromise, getRedisClient, REDIS_PREFIX };
export default redisClientPromise;

/**
 * Wrapper for caching data in Redis with environment-specific prefixing.
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
) {
  let redis;
  const fullKey = `${REDIS_PREFIX}:${key}`;
  
  try {
    redis = await getRedisClient();
    if (redis && (redis.isReady || redis.isOpen)) {
      const cached = await redis.get(fullKey);
      if (cached) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Redis] Cache HIT for key: ${fullKey}`);
        }
        return JSON.parse(cached) as T;
      }
      if (process.env.NODE_ENV === 'development') {
          console.log(`[Redis] Cache MISS for key: ${fullKey}`);
      }
    } else {
      console.warn(`[Redis] Client not ready for key: ${fullKey} (isReady: ${redis?.isReady}, isOpen: ${redis?.isOpen})`);
    }
  } catch (err) {
    console.error(`[Redis] get error for key ${fullKey}:`, err);
  }

  const data = await fetcher();

  try {
    if (redis && (redis.isReady || redis.isOpen)) {
      await redis.setEx(fullKey, ttl, JSON.stringify(data));
      if (process.env.NODE_ENV === 'development') {
          console.log(`[Redis] Cache SET successful for key: ${fullKey}`);
      }
    }
  } catch (err) {
    console.error(`[Redis] set error for key ${fullKey}:`, err);
  }

  return data;
}

/**
 * Invalidate a cache key.
 */
export async function invalidateCache(key: string) {
  const fullKey = `${REDIS_PREFIX}:${key}`;
  try {
    const redis = await getRedisClient();
    if (redis.isReady) {
      await redis.del(fullKey);
    }
  } catch (err) {
    console.error(`Redis del error for key ${fullKey}:`, err);
  }
}
