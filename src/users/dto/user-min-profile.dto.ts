import { ApiProperty } from '@nestjs/swagger';

export class UserMinProfileDto {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  profilePic: string;
}
