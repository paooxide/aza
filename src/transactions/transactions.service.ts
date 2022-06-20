import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async create(userId, paymentData: CreateTransactionsDto) {
    const transaction = {
      customerID: new Types.ObjectId(userId),
      inputAmount: paymentData.inputAmount,
      inputCurrency: paymentData.inputCurrency,
      outputAmount: paymentData.outputAmount,
      outputCurrency: paymentData.outputCurrency,
    };
    return this.transactionsRepository.create(transaction);
  }

  async getAllTransaction(pagination: PaginationDTO) {
    const transactions = await this.transactionsRepository.findAll(
      Number(pagination.offset),
      Number(pagination.limit),
    );
    return transactions;
  }

  async getSingleTransaction(transactionId: string) {
    const transaction = await this.transactionsRepository.findOne({
      _id: new Types.ObjectId(transactionId),
    });
    return transaction;
  }

  async updateSingleTransaction(userId: string, transactionId: string, data) {
    const transaction = await this.transactionsRepository.findOne({
      _id: new Types.ObjectId(transactionId),
    });
    if (transaction.customerID.toString() !== userId) {
      throw new UnauthorizedException('Invalid User');
    }
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return this.transactionsRepository.updateOne(transactionId, data);
  }
}
