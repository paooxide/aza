import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserLocaleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  locales: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  primaryLocale: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  region: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timezone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  languages: string[];
}
