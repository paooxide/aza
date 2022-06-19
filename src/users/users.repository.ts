import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

const searchProjection = {
  _id: 1,
  username: 1,
  firstName: 1,
  lastName: 1,
  profilePic: 1,
  type: 1,
};

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    return this.model.create(createUserDto);
  }

  async find(): Promise<User[]> {
    return this.model.find().exec();
  }

  async findAll(
    findQuery?: FilterQuery<UserDocument>,
    option?: any,
    extra?: any,
  ): Promise<User[]> {
    return this.model.find(findQuery, option, extra).exec();
  }

  async findOne(query, populate?: any): Promise<User | undefined> {
    return this.model.findOne(query).populate(populate?.key, populate?.value);
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.model.findById(userId);
  }

  async getUserData(payload: any): Promise<User | undefined> {
    return this.model.findOne(payload).select('+hash +salt');
  }

  async saveUser(user: any): Promise<User> {
    return user.save();
  }

  public async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<UserDocument>,
    option?: QueryOptions,
  ): Promise<User> {
    return this.model.findByIdAndUpdate(id, updateQuery, option);
  }

  public async search(
    query: string,
    limit: number,
    skip: number,
  ): Promise<User[]> {
    return this.model.aggregate([
      {
        $search: {
          index: 'searchUserIndex',
          compound: {
            must: [
              {
                exists: { path: 'firstName' },
              },
              {
                text: {
                  query,
                  path: ['firstName', 'lastName', 'username', 'email', 'type'],
                  fuzzy: {},
                },
              },
            ],
            filter: [
              {
                range: { path: 'userActiveStatus', lte: 0, gte: 0 },
              },
            ],
          },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      { $project: searchProjection },
    ]);
  }
}
