import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { TransactionssResponseDto } from './dto/transaction-response.dto';
import { UpdateTransactionsDto } from './dto/update-transactions.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('create-transaction')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Submits a new transaction',
    type: TransactionssResponseDto,
  })
  async create(
    @AuthUser() user,
    @Body() transactionData: CreateTransactionsDto,
  ) {
    return this.transactionsService.create(user._id, transactionData);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'list all transactions',
    type: [TransactionssResponseDto],
  })
  async getAllTransaction(@AuthUser() user, @Query() params: PaginationDTO) {
    return this.transactionsService.getAllTransaction(params);
  }

  @Get(':transactionid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'list all transactions',
    type: [TransactionssResponseDto],
  })
  async getSingleTransaction(
    @AuthUser() user,
    @Param('transactionid') transactionId: string,
  ) {
    return this.transactionsService.getSingleTransaction(transactionId);
  }

  @Put(':transactionid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'list all transactions',
    type: [TransactionssResponseDto],
  })
  async updateSingleTransaction(
    @AuthUser() user,
    @Param('transactionid') transactionId: string,
    @Body() data: UpdateTransactionsDto,
  ) {
    return this.transactionsService.updateSingleTransaction(
      user._id,
      transactionId,
      data,
    );
  }
}
