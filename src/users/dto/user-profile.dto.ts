import { AdminAccess, GenderType, PronounsType } from './../types/users.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserType } from '../types/users.types';
import { UpdateUserLocaleDto } from './update-user-locale.dto';

export class UserProfileDto {
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
  userActiveStatus: number;

  @ApiProperty()
  type: UserType;
  @ApiProperty()
  privilege: AdminAccess;

  @ApiProperty()
  createdAt?: Date;
}
