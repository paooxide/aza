import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as generateApiKey from 'generate-api-key';
import { KeysRepository } from './keys.repository';
import { Types } from 'mongoose';

@Injectable()
export class ChainService {
  constructor(
    private keysRepository: KeysRepository,
    private configService: ConfigService,
  ) {}

  async generateNewSecret(user: string) {
    const newAPIKey = generateApiKey({ method: 'base62' });
    const newSecret = generateApiKey();
    return this.keysRepository.create({
      apiKey: newAPIKey,
      apiSecret: newSecret,
      user: user,
    });
  }

  async getSecrets(user: string) {
    return await this.keysRepository.find({ user: user });
  }

  async removeSecret(user: string, apiKey: string) {
    const key = await this.keysRepository.findOne({
      user: new Types.ObjectId(user),
      apiKey: apiKey,
    });
    if (!key) {
      throw new NotFoundException('Key not found');
    }
    return await this.keysRepository.deleteOne(key._id);
  }
}
