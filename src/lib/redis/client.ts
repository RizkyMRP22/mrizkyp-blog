import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.redis_mrizkyp_REDIS_URL;

declare global {
  // eslint-disable-next-line no-var
  var _redisClientPromise: Promise<RedisClientType> | undefined;
}

if (!redisUrl) {
  console.error('[Redis] CRITICAL: redis_mrizkyp_REDIS_URL is not defined!');
} else {
  const obscuredUrl = redisUrl.replace(/:[^:@]+@/, ':****@');
  console.log(`[Redis] Initializing client with URL: ${obscuredUrl}`);
}

let redisClientPromise: Promise<RedisClientType>;

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._redisClientPromise) {
    console.log('[Redis] Creating singleton client for development');
    const client = createClient({
      url: redisUrl,
    });
    client.on('error', (err) => console.error('[Redis] Client Error:', err));
    client.on('connect', () => console.log('[Redis] Client connected'));
    client.on('ready', () => console.log('[Redis] Client ready'));
    globalThis._redisClientPromise = client.connect() as Promise<RedisClientType>;
  }
  redisClientPromise = globalThis._redisClientPromise;
} else {
  console.log('[Redis] Creating new client instance');
  const client = createClient({
    url: redisUrl,
  });
  client.on('error', (err) => console.error('[Redis] Client Error:', err));
  client.on('connect', () => console.log('[Redis] Client connected'));
  client.on('ready', () => console.log('[Redis] Client ready'));
  redisClientPromise = client.connect() as Promise<RedisClientType>;
}

export async function getRedisClient() {
  return await redisClientPromise;
}

export default redisClientPromise;
