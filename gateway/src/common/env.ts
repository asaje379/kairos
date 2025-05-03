import { config } from 'dotenv';

config();

export const Env = {
  port: process.env.PORT ? +process.env.PORT : 3000,
  redisUrl: process.env.REDIS_URL ?? 'localhost:6379',
};
