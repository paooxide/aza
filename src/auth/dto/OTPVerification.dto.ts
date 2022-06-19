import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OTPVerificationDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;
}
