import { ApiProperty } from '@nestjs/swagger';

export class OTPResponseDTO {
  @ApiProperty()
  duration: string;

  @ApiProperty()
  email: string;
}
