import IORedis from 'ioredis';
import { config } from './env';

// Options for robustness
const redisOptions = {
  maxRetriesPerRequest: null, // Required for BullMQ
  enableReadyCheck: false,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
};

// General purpose Redis instance (Cache, Rate Limits)
export const redis = new IORedis(config.REDIS_URL, redisOptions);

redis.on('error', (err) => console.error('[Redis] Error:', err));
redis.on('connect', () => console.log('[Redis] Connected'));