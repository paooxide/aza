import { Injectable } from '@nestjs/common';

import * as redis from 'redis';
import { appConstant } from '../../../common/constants/app.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  port: number;
  host: string;
  client: any;

  constructor(configService: ConfigService) {
    this.port = parseInt(configService.get('REDIS_SERVER_PORT'));
    this.host = configService.get('REDIS_SERVER_URL');

    const redisClient = redis.createClient(this.port, this.host);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const asyncRedis = require('async-redis');
    this.client = asyncRedis.decorate(redisClient);

    this.client.on('error', (error) => {
      throw new Error(error);
    });
  }

  async set(
    key,
    value: string,
    duration = appConstant.REDIS.MODE.REDIS_DURATION,
    ex = appConstant.REDIS.MODE.EX,
  ) {
    return await this.client.set(key, value, ex, duration);
  }

  async get(key: string): Promise<string | boolean | any> {
    if (key !== null && key !== undefined && key !== 'undefined') {
      return await this.client.get(key);
    }
  }

  async delete(key: string) {
    if (key !== null && key !== undefined && key !== 'undefined') {
      return await this.client.del(key);
    }
  }
}
