import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { appConstant } from 'src/common/constants/app.constant';

export class PasswordChangeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(appConstant.REGEX.PASSWORD, {
    message: appConstant.REGEX.VERIFY_MESSAGE,
  })
  newPassword: string;
}
