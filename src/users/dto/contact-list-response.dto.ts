import { ApiProperty } from '@nestjs/swagger';
import { UserMinProfileDto } from './user-min-profile.dto';

export class ContactListResponseDto {
  @ApiProperty()
  phone?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ type: UserMinProfileDto })
  userInfo: UserMinProfileDto;
}
