import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty()
  @IsString()
  reason: string;
}
