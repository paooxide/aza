import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { GenderType, PronounsType } from '../types/users.types';

export class UpdateUserProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: GenderType })
  @IsOptional()
  @IsString()
  @IsEnum(GenderType)
  gender?: GenderType;

  @ApiPropertyOptional({ enum: PronounsType })
  @IsOptional()
  @IsString()
  @IsEnum(PronounsType)
  pronouns?: PronounsType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tags?: string[];
}
