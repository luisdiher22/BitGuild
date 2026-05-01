import Redis from "ioredis";
import { env } from "~/env";

const createRedisClient = () =>
  new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createRedisClient> | undefined;
};

export const redis = globalForRedis.redis ?? createRedisClient();

globalForRedis.redis = redis;
