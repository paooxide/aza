import { Controller, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChainService } from './chain.service';
import { DeleteKeyDto } from './dto/delete-key.dto';
import { UserSecretKeysDto } from './dto/user-secret-key.dto';

@ApiTags('chain')
@Controller('chain')
export class ChainController {
  constructor(private chainService: ChainService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Generates new secrets',
    type: UserSecretKeysDto,
  })
  @Get('generate-secret')
  async generateNewSecret(@AuthUser() user): Promise<UserSecretKeysDto> {
    return await this.chainService.generateNewSecret(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns generated secrets',
    type: [UserSecretKeysDto],
  })
  @Get('view-secret')
  async getSecrets(@AuthUser() user): Promise<UserSecretKeysDto[]> {
    return await this.chainService.getSecrets(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns generated secrets',
    type: UserSecretKeysDto,
  })
  @Delete('delete-secret')
  async removeSecrets(
    @AuthUser() user,
    @Query() key: DeleteKeyDto,
  ): Promise<UserSecretKeysDto> {
    return await this.chainService.removeSecret(user._id, key.apiKey);
  }
}
