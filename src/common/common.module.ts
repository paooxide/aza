import { Module } from '@nestjs/common';
import { RedisService } from './services/redis/redis.service';
import { EmailService } from './services/email/email.service';

@Module({
  providers: [RedisService, EmailService],
  exports: [RedisService, EmailService],
})
export class CommonModule {}
