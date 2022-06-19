import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSecretKeysDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiSecret: string;
}
