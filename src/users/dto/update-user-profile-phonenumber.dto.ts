import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserProfilePhoneNumberDto {
  @ApiProperty()
  @IsString()
  phoneNumber: string;
}
