import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TransactionssResponseDto {
  @ApiProperty()
  @IsString()
  _id: string;

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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
