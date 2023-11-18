import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }
  // hGetAll(key: string): 从哈希数据结构中获取指定 key 的所有字段和值。
  // hSet(key: string, field: string, value: any): 将指定 key 的哈希数据结构中的字段 field 设置为 value。
  // expire(key: string, ttl: number): 设置指定 key 的过期时间为 ttl 秒。
  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
