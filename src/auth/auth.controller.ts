import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  Put,
  Headers,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { OTPResponseDTO } from './dto/OTPResponse.dto';
import { OTPRequestDTO } from './dto/OTPRequest.dto';
import { OTPVerificationDTO } from './dto/OTPVerification.dto';
import { PasswordResetDto } from './dto/passwordReset.dto';
import { PasswordChangeDto } from './dto/password-change.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(req.user);
    return result;
  }

  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @Post('refresh')
  async refreshToken(@AuthUser() user, @Body() body: RefreshTokenDto) {
    const { refreshToken } = body;
    const result = await this.authService.refreshToken(user, refreshToken);
    return result;
  }

  @ApiOkResponse({
    type: OTPResponseDTO,
  })
  @UseGuards(ThrottlerGuard)
  @Throttle(10, 60) // 10 requests per minute
  @Post('request-otp')
  async requestOtp(@Body() otpRequest: OTPRequestDTO) {
    return this.authService.handleOTPRequest(otpRequest);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() otpVerification: OTPVerificationDTO) {
    return this.authService.handleOTPVerification(otpVerification);
  }

  @ApiOkResponse({
    description: 'Needs previous phone verification',
    status: 201,
  })
  @Post('password-reset')
  async passwordReset(@Body() { emailOrPhone, password }: PasswordResetDto) {
    return this.authService.resetPassword(emailOrPhone, password);
  }

  @ApiOkResponse({
    description: 'Need current password to change password',
    status: 200,
  })
  @Post('change-password')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @AuthUser() user,
    @Body() { oldPassword, newPassword }: PasswordChangeDto,
  ): Promise<string> {
    const userId = user._id;
    return this.authService.changePassword(userId, oldPassword, newPassword);
  }

  @ApiOkResponse({
    description: 'Log-out successful',
    status: 200,
  })
  @Put('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async logout(@AuthUser() user, @Headers() headers): Promise<string> {
    return this.authService.logout(
      user._id,
      headers['x-device-id'],
      headers['x-bundle-id'],
    );
  }
}
