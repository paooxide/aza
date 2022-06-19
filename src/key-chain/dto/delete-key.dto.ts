import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiKey: string;
}
