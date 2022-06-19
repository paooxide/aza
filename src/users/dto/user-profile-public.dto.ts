import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { GenderType, PronounsType, UserType } from '../types/users.types';
import { UpdateUserLocaleDto } from './update-user-locale.dto';

export class UserProfilePublicDto {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  birthday?: string;

  @ApiPropertyOptional({ enum: GenderType })
  @IsString()
  @IsEnum(GenderType)
  gender?: GenderType;

  @ApiPropertyOptional({ enum: PronounsType })
  @IsString()
  @IsEnum(PronounsType)
  pronouns?: PronounsType;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  profilePic: string;

  @ApiProperty()
  @IsString()
  tags: string[];

  @ApiProperty()
  locale: UpdateUserLocaleDto;

  @ApiProperty()
  followers?: number;

  @ApiProperty()
  followings?: number;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  referredBy?: string;
}
