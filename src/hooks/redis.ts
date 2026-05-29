import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const globalForRedis = global as unknown as { redis: Redis };

/**
 * Singleton Redis client to prevent multiple connections during hot-reloads
 */
export const redis = globalForRedis.redis || new Redis(redisUrl);

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}

export default redis;