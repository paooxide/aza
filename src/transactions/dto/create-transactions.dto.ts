import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionsDto {
  @ApiProperty()
  @IsNumber()
  inputAmount: number;

  @ApiProperty()
  @IsString()
  inputCurrency: string;

  @ApiProperty()
  @IsNumber()
  outputAmount: number;

  @ApiProperty()
  @IsString()
  outputCurrency: string;
}
