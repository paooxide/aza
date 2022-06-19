import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserProfileDto } from './dto/user-profile.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserLocaleDto } from './dto/update-user-locale.dto';
import { mapUserPrivateProfile } from './mappings/user-profile-map';
import { CheckAvailableUserParamsDTO } from './dto/check-available-user-params.dto';
import { UpdateUserProfileUsernameDto } from './dto/update-user-profile-username.dto';
import { UpdateUserProfileEmailAddressDto } from './dto/update-user-profile-email-address.dto';
import { UserProfilePublicDto } from './dto/user-profile-public.dto';
import { v4 as uuid } from 'uuid';
import { UserType } from './types/users.types';
import { UpdateUserPrivilegeDto } from './dto/update-user-admin-access.dto';

export enum UserActiveStatus {
  deactivated = 1,
  deleted = 2,
}

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    const result = await this.usersRepository.find();
    return result;
  }

  async create(payload, isSocial = false): Promise<User> {
    // TODO Check if invited

    if (isSocial) {
      const createdUser: any = await this.usersRepository.create(payload);
      return createdUser;
    } else {
      let phoneNumber;
      if (payload.phoneNumber) {
        phoneNumber = payload.countryCode + payload.phoneNumber;

        const createdUser: any = await this.usersRepository.create(payload);

        return createdUser;
      } else {
        const createdUser: any = await this.usersRepository.create(payload);

        return createdUser;
      }
    }
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const user: UserProfileDto = await this.usersRepository.findOne({
      _id: userId,
    });

    return user;
  }

  async getUserByUsername(
    username: string,
  ): Promise<UserProfilePublicDto | undefined> {
    const user: UserProfileDto = await this.usersRepository.findOne({
      username,
    });

    if (
      user &&
      user.userActiveStatus &&
      (user.userActiveStatus === 1 || user.userActiveStatus === 2)
    ) {
      return;
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (email !== undefined) {
      return this.usersRepository.findOne({ email });
    }
  }

  async updateUserData(
    userId,
    updateUserLocaleDto: UpdateUserLocaleDto,
  ): Promise<User | undefined> {
    const userInfo: UserProfileDto = await this.usersRepository.findById(
      userId,
    );

    if (userInfo._id === undefined) {
      throw new ForbiddenException('You are not allowed to update');
    }

    userInfo.locale = updateUserLocaleDto;

    const user: UserProfileDto = await this.usersRepository.findByIdAndUpdate(
      userId,
      userInfo,
      {
        new: true,
      },
    );

    return user ? mapUserPrivateProfile(user) : null;
  }

  async isExist(data: CheckAvailableUserParamsDTO): Promise<boolean | User> {
    // changed the promise to return boolean
    const { email, username } = data;
    let result: any;

    if (username) {
      result = await this.usersRepository.findOne({ username });
    } else if (email) {
      result = await this.usersRepository.findOne({ email });
    } else {
      throw new BadRequestException('missing params');
    }

    if (result?._id) {
      return true;
    }
    return false;
  }

  async updateProfileUsername(
    userId,
    updateUserProfileUsernameDto: UpdateUserProfileUsernameDto,
  ): Promise<User | undefined> {
    const { username } = updateUserProfileUsernameDto;

    const userInfo: any = await this.usersRepository.findById(userId);

    if (userInfo._id === undefined) {
      throw new ForbiddenException('You are not allowed to update');
    }
    // check if username used
    const usernameInfo: any = await this.usersRepository.findOne({ username });
    if (usernameInfo?._id !== undefined && userInfo?.username !== username) {
      throw new ForbiddenException('Username already exists');
    }

    const updateObject = Object.assign(userInfo, updateUserProfileUsernameDto);

    const user: UserProfileDto = await this.usersRepository.findByIdAndUpdate(
      userId,
      updateObject,
      { new: true },
    );
    return user ? mapUserPrivateProfile(user) : null;
  }

  async updateProfileEmailAddress(
    userId,
    updateUserProfileEmailAddressDto: UpdateUserProfileEmailAddressDto,
  ): Promise<User | undefined> {
    const { email } = updateUserProfileEmailAddressDto;

    const userInfo: any = await this.usersRepository.findById(userId);

    if (userInfo._id === undefined) {
      throw new ForbiddenException('You are not allowed to update');
    }
    // check if email used
    const useremailInfo: any = await this.usersRepository.findOne({ email });
    if (useremailInfo?._id !== undefined && userInfo?.email !== email) {
      throw new ForbiddenException('Email already exists');
    }

    const updateObject = Object.assign(
      userInfo,
      updateUserProfileEmailAddressDto,
    );

    const user: UserProfileDto = await this.usersRepository.findByIdAndUpdate(
      userId,
      updateObject,
      { new: true },
    );
    return user ? mapUserPrivateProfile(user) : null;
  }

  public async changePassword(
    userId: string,
    hash: string,
    salt: string,
  ): Promise<User> {
    return await this.usersRepository.findByIdAndUpdate(userId, {
      hash,
      salt,
    });
  }

  async deactivateAccount(userId) {
    try {
      const userActiveStatus = UserActiveStatus.deactivated;
      const result = await this.usersRepository.findByIdAndUpdate(
        userId,
        {
          userActiveStatus,
        },
        {
          new: true,
        },
      );
      if (result) {
        return result;
      } else {
        throw new BadRequestException('Already Deactivated');
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(userId, deleteUserDto): Promise<User | undefined> {
    try {
      const { reason } = deleteUserDto;

      const deleteObject = {
        tags: null,
        firstName: 'Deleted',
        lastName: 'User',
        email: null,
        salt: null,
        hash: null,
        username: uuid(),
        countryCode: null,
        phoneNumber: null,
        userActiveStatus: UserActiveStatus.deleted,
        userTitles: null,
        appleSocialLogin: null,
        twitterSocialLogin: null,
        googleSocialLogin: null,
        facebookSocialLogin: null,
        reason,
      };

      const userObject = await this.usersRepository.findById(userId);

      const result = await this.usersRepository.findByIdAndUpdate(
        userId,
        deleteObject,
        {
          new: true,
        },
      );
      if (result?.userActiveStatus === UserActiveStatus.deleted) {
        throw new BadRequestException('Already Deleted');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUserAccountType(userId, type: UserType): Promise<User> {
    return this.usersRepository.findByIdAndUpdate(userId, { type });
  }

  async updateUserPrivilege(
    username: string,
    updateUserPrivilegeDto: UpdateUserPrivilegeDto,
  ): Promise<User | undefined> {
    const userInfo: any = await this.usersRepository.findOne({ username });

    if (userInfo._id === undefined) {
      throw new ForbiddenException('You are not allowed to update');
    }
    const updateObject = Object.assign(userInfo, {
      privilege: updateUserPrivilegeDto.privilege,
    });
    const user: UserProfileDto = await this.usersRepository.findByIdAndUpdate(
      userInfo._id,
      updateObject,
      { new: true },
    );
    return user ? mapUserPrivateProfile(user) : null;
  }

  async getUserData(payload: any): Promise<User | undefined> {
    return this.usersRepository.getUserData(payload);
  }
}
