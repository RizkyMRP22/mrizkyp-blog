/**
 * Redis configuration and flagging logic.
 * Splits data between 'api-preview' (release/dev) and 'api-master' (production).
 */

const getRedisFlag = () => {
  // Allow manual override
  if (process.env.REDIS_FLAG) {
    return process.env.REDIS_FLAG;
  }

  // Detect environment
  const isProduction =
    process.env.VERCEL_ENV === 'production' &&
    process.env.NODE_ENV === 'production';

  return isProduction ? 'redis-master' : 'redis-preview';
};

export const REDIS_PREFIX = getRedisFlag();

console.log(`[Redis] Using prefix: ${REDIS_PREFIX} (VERCEL_ENV: ${process.env.VERCEL_ENV}, NODE_ENV: ${process.env.NODE_ENV})`);
