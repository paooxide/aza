import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from '../auth/auth.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';
import { Transactions, TransactionsSchema } from './schema/transactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transactions.name,
        schema: TransactionsSchema,
      },
    ]),
    AuthModule,
    CommonModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsService],
})
export class TransactionsModule {}
