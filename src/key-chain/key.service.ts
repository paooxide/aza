import { Injectable } from '@nestjs/common';
import { KeysRepository } from './keys.repository';

@Injectable()
export class KeyService {
  constructor(private keysRepository: KeysRepository) {}

  getKeyUser(keys: { apiKey: string; apiSecret: string }) {
    return this.keysRepository.findOne({
      apiKey: keys.apiKey,
      apiSecret: keys.apiSecret,
    });
  }
}
