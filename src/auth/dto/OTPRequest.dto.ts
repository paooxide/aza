import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OTPRequestType } from '../auth.service';

export class OTPRequestDTO {
  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsEnum(OTPRequestType)
  @IsNotEmpty()
  @ApiProperty({ enum: OTPRequestType })
  type: OTPRequestType;
}
