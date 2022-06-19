import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { mockUser } from './users.service.spec';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn(),
            create: jest.fn(),
            getUserById: jest.fn(),
            getUserByUsername: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserData: jest.fn(),
            updateProfileData: jest.fn(),
            updateUserData: jest.fn(),
            isExist: jest.fn(),
            updateProfileUsername: jest.fn(),
            updateUserGeneralSettings: jest.fn(),
            updateUserNotificationsSettings: jest.fn(),
            updateProfileEmailAddress: jest.fn(),
            updateProfilePhoneNumber: jest.fn(),
            deactivateAccount: jest.fn(),
            deleteAccount: jest.fn(),
            associateDeviceToUser: jest.fn(),
            getPodcasterFixedItem: jest.fn(),
            getPodcasterHighlightedEpisodes: jest.fn(),
            checkContacts: jest.fn(),
            updateReferredByField: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return user own profile object', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });

      jest
        .spyOn(service, 'getUserById')
        .mockImplementation(async () => userInfo);

      jest.enableAutomock();

      expect(
        await controller.getProfile({
          user: { _id: '6033fd87b15e6650b40e98c6' },
        }),
      ).toStrictEqual(userInfo);
    });
  });

  describe('getProfileByUsername', () => {
    it('should return a public profile by username', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });

      jest
        .spyOn(service, 'getUserByUsername')
        .mockImplementation(async () => userInfo);

      jest.enableAutomock();

      expect(
        await controller.getProfileByUsername('john-doe-12345'),
      ).toStrictEqual(userInfo);
    });
  });

  describe('isExist', () => {
    it('should return true if check email already exist', async () => {
      mockUser('john.doe@email.com');

      jest.spyOn(service, 'isExist').mockImplementation(async () => true);

      jest.enableAutomock();

      expect(
        await controller.isExist({ email: 'john.doe@email.com' }),
      ).toStrictEqual(true);
    });

    it('should return true if check username already exist', async () => {
      mockUser('john.doe@email.com');

      jest.spyOn(service, 'isExist').mockImplementation(async () => true);

      jest.enableAutomock();

      expect(
        await controller.isExist({ username: 'john-doe-12345' }),
      ).toStrictEqual(true);
    });
  });

  describe('updateProfileUsername', () => {
    it('should update user profile username and return updated profile', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const username = 'john';

      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });

      const updatedResult = Object.assign(userInfo, {
        username,
      });

      jest
        .spyOn(service, 'updateProfileUsername')
        .mockImplementation(async () => updatedResult);

      jest.enableAutomock();
      expect(
        await controller.updateProfileUsername('6033fd87b15e6650b40e98c6', {
          username,
        }),
      ).toStrictEqual(updatedResult);
    });
  });

  describe('accountDeactivationAndDeletion', () => {
    it('should deactivate a user account', async () => {
      const result = {
        tags: [],
        _id: '60c917959b3ea8003a702356',
        email: 'karo@mail.com',
        username: 'mr_karoo',
        countryCode: '+234',
        phoneNumber: '8138767898',
        firstName: 'karo',
        lastName: 'uwede',
        createdAt: '2021-06-15T21:11:49.750Z',
        updatedAt: '2021-06-25T06:48:45.171Z',
        __v: 0,
        userActiveStatus: 1,
      };

      jest
        .spyOn(service, 'deactivateAccount')
        .mockImplementation(async () => result as any);

      jest.enableAutomock();
      expect(
        await controller.deactivateAccount({
          user: { _id: '60bdea15af315808803dcce5' },
        }),
      ).toBe(result);
    });

    it('should delete a user account', async () => {
      const deleteObject = {
        tags: null,
        firstName: 'Deleted',
        lastName: 'User',
        email: null,
        salt: null,
        hash: null,
        username: null,
        countryCode: null,
        phoneNumber: null,
        userActiveStatus: 2,
        userTitles: null,
        appleSocialLogin: null,
        twitterSocialLogin: null,
        googleSocialLogin: null,
        facebookSocialLogin: null,
        reason: 'Reason for account deletion',
      };

      const result = {
        tags: null,
        _id: '60c917959b3ea8003a702356',
        email: null,
        username: null,
        countryCode: null,
        phoneNumber: null,
        firstName: 'Deleted',
        lastName: 'User',
        createdAt: '2021-06-15T21:11:49.750Z',
        updatedAt: '2021-06-25T06:55:29.354Z',
        __v: 0,
        userActiveStatus: 2,
        appleSocialLogin: null,
        facebookSocialLogin: null,
        googleSocialLogin: null,
        reason: 'Reason for account deletion',
        twitterSocialLogin: null,
        userTitles: null,
      };

      jest
        .spyOn(service, 'deleteAccount')
        .mockImplementation(async () => result as any);

      jest.enableAutomock();

      expect(
        await controller.deleteAccount(
          { user: { _id: '60bdea15af315808803dcce5' } },
          deleteObject,
        ),
      ).toBe(result);
    });
  });
});
