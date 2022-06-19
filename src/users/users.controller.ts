import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../common/decorators/user.decorator';
import { User } from './schemas/user.schema';
import { UserProfileDto } from './dto/user-profile.dto';
import { CheckAvailableUserParamsDTO } from './dto/check-available-user-params.dto';
import { UpdateUserProfileUsernameDto } from './dto/update-user-profile-username.dto';
import { UserProfilePublicDto } from './dto/user-profile-public.dto';
import { appConstant } from '../common/constants/app.constant';
import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns other user profile',
    type: UserProfileDto,
  })
  @Get('user/:username')
  async getUsername(@Param('username') username: string): Promise<any> {
    return await this.usersService.getUserByUsername(username);
  }

  @Post('user')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const {
      email,
      password,
      firstName,
      lastName,
      username,
      isSocial = false,
    } = createUserDto;

    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Account already exists',
      });
    }

    // Check if username exist
    if (username) {
      const user = await this.usersService.getUserByUsername(username);
      if (user) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: 'Username already exists',
        });
      }
    }

    let createdUser: any;

    if (isSocial) {
      const userData = {
        email,
        username,
        firstName,
        lastName,
      };
      createdUser = await this.usersService.create(userData, isSocial);
    } else {
      const { salt, hash } = await this.authService.saltPassword(password);
      // Verify password policy
      // Atleast one uppercase character, atleast one lowercase character, at least one number, at least one special character and minimum 8 character
      // Regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()+,-.:;<=>?@[\]^_`{|}~*])(?=.{8,})
      const regularExpression = appConstant.REGEX.PASSWORD;

      if (!regularExpression.test(password)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid password format',
        });
      }

      const userData = {
        email,
        salt,
        hash,
        username,
        firstName,
        lastName,
      };

      createdUser = await this.usersService.create(userData, isSocial);
    }

    // TODO: Send welcome email and email verification link
    const newUser = createdUser;
    const loginPayload = {
      _id: newUser._id,
      email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    return res
      .status(HttpStatus.CREATED)
      .send(await this.authService.login(loginPayload));
  }

  // @Put('users/locale')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({
  //   description: 'Get user profile with locale after update',
  //   type: UserProfileDto,
  // })
  // async updateUser(
  //   @AuthUser() user,
  //   @Body() updateUserLocaleDto: UpdateUserLocaleDto,
  // ): Promise<User> {
  //   return this.usersService.updateUserData(user._id, updateUserLocaleDto);
  // }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get own profile of a user',
    type: UserProfileDto,
  })
  async getProfile(@AuthUser() user): Promise<any> {
    const userId = user._id;
    return this.usersService.getUserById(userId);
  }

  @Get('profile/:username')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get public profile of a user',
    type: UserProfilePublicDto,
  })
  async getProfileByUsername(
    @Param('username') username: string,
  ): Promise<any> {
    return this.usersService.getUserByUsername(username);
  }

  @Get('users/exist')
  @ApiOkResponse({
    description:
      'Check whether the given username, email or phone number is already exist. Pass only one param at a time',
    type: Boolean,
  })
  async isExist(
    @Query() params: CheckAvailableUserParamsDTO,
  ): Promise<boolean | User> {
    return this.usersService.isExist(params);
  }

  @Put('profile/username')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updates the username and returns the updated profile',
    type: UserProfileDto,
  })
  async updateProfileUsername(
    @AuthUser() user,
    @Body() updateUserProfileUsernameDto: UpdateUserProfileUsernameDto,
  ): Promise<User> {
    return this.usersService.updateProfileUsername(
      user._id,
      updateUserProfileUsernameDto,
    );
  }

  @Post('account/deactivate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Allows a user to deactivate an account',
  })
  async deactivateAccount(@AuthUser() user) {
    const userId = user._id;
    return this.usersService.deactivateAccount(userId);
  }

  @Post('account/delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Allows a user to delete an account',
  })
  async deleteAccount(
    @AuthUser() user,
    @Body() @Body() deleteUserDto: DeleteUserDto,
  ): Promise<User> {
    const userId = user._id;

    return this.usersService.deleteAccount(userId, deleteUserDto);
  }
}
