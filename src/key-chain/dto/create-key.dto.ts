import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKeysDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiSecret: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: string;
}
