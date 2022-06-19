import { FilterQuery, Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keys, KeysDocument } from './schemas/keys.schema';
import { CreateKeysDto } from './dto/create-key.dto';

@Injectable()
export class KeysRepository {
  constructor(@InjectModel(Keys.name) private model: Model<KeysDocument>) {}

  public async create(createKeysDto: CreateKeysDto): Promise<Keys> {
    const keyInfo = {
      user: new Types.ObjectId(createKeysDto.user),
      apiKey: createKeysDto.apiKey,
      apiSecret: createKeysDto.apiSecret,
    };
    return this.model.create(keyInfo);
  }

  async find(findQuery?: FilterQuery<KeysDocument>): Promise<Keys[]> {
    return this.model.find(findQuery).exec();
  }

  async findAll(
    findQuery?: FilterQuery<KeysDocument>,
    option?: any,
    extra?: any,
  ): Promise<Keys[]> {
    return this.model.find(findQuery, option, extra).exec();
  }

  async findOne(query): Promise<KeysDocument | undefined> {
    return this.model.findOne(query);
  }

  async findById(keysId: string): Promise<Keys> {
    return this.model.findById(keysId);
  }

  async deleteOne(keysId: string): Promise<Keys | undefined> {
    return this.model.findByIdAndDelete(keysId);
  }
}
