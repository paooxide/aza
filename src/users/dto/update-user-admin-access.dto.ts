import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { AdminAccess } from '../types/users.types';

export class UpdateUserPrivilegeDto {
  @ApiProperty({ enum: Object.values(AdminAccess) })
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(AdminAccess)
  privilege: AdminAccess;
}
