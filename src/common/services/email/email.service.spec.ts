import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from '../redis/redis.service';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  let redis: RedisService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: RedisService,
          useValue: { get: jest.fn(), set: jest.fn(), delete: jest.fn() },
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    redis = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
