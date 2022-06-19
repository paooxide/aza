import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserProfileUsernameDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;
}
