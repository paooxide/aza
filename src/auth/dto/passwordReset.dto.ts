import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { appConstant } from 'src/common/constants/app.constant';

export class PasswordResetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emailOrPhone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(appConstant.REGEX.PASSWORD)
  password: string;
}
