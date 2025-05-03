import Redis from 'ioredis';
import { Env } from './env';

class RedisConnector {
  private subscriber: Redis | null;
  private publisher: Redis | null;

  constructor() {
    this.subscriber = new Redis(Env.redisUrl);
    this.publisher = new Redis(Env.redisUrl);
  }

  publish<T>(channel: string, data: T) {
    this.publisher?.publish(channel, JSON.stringify(data));
  }

  subscribe(...channels: string[]) {
    this.subscriber?.subscribe(...channels);
  }

  addListener<T>(channel: string, cb: (msg: string) => void) {
    this.subscriber?.on('message', (ch: string, msg: string) => {
      if (ch === channel) {
        cb(msg);
      }
    });
  }
}

export const redis = new RedisConnector();
