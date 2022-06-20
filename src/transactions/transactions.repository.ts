import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import {
  Transactions,
  TransactionsDocument,
} from './schema/transactions.schema';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectModel(Transactions.name)
    private model: Model<TransactionsDocument>,
  ) {}

  public async create(transactionsDto): Promise<TransactionsDocument> {
    return this.model.create(transactionsDto);
  }

  public async find(
    findQuery?: FilterQuery<TransactionsDocument>,
    option?: QueryOptions,
    extra?: any,
  ): Promise<Transactions[]> {
    return this.model.find(findQuery, option, extra).exec();
  }

  public async findAll(offset = 10, limit = 10): Promise<Transactions[]> {
    return this.model.find().skip(offset).limit(limit).exec();
  }

  public async findOne(query: FilterQuery<TransactionsDocument>) {
    return this.model.findOne(query);
  }

  findOneById(id: Types.ObjectId) {
    return this.model.findOne({ _id: id });
  }

  public async updateOne(
    id: string,
    updateQuery?: UpdateQuery<Partial<TransactionsDocument>>,
  ): Promise<TransactionsDocument> {
    return this.model.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateQuery,
      {
        new: true,
      },
    );
  }

  public async delete(query: FilterQuery<TransactionsDocument>) {
    return this.model.findOneAndDelete(query);
  }
}
