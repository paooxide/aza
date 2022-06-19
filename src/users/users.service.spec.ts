import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { mapUserPrivateProfile } from './mappings/user-profile-map';
import { UserType, AdminAccess } from './types/users.types';

export const mockUser = (
  email = 'john.doe@email.com',
  firstName = 'John',
  lastName = 'Doe',
  hash = '23r14t35',
  salt = 'ufg3u24ou34',
  username = 'john-doe-12345',
  bio = '',
  profilePic = '',
  devices = [],
  userActiveStatus = 0,
  tags = [],
  locale = {
    locales: [],
    primaryLocale: '',
    region: '',
    timezone: '',
    languages: [],
  },
  type = UserType.organization,
  privilege = AdminAccess.user,
): User => ({
  email,
  firstName,
  lastName,
  hash,
  salt,
  username,
  bio,
  profilePic,
  tags,
  locale,
  devices,
  userActiveStatus,
  type,
  privilege,
});

const mockUserDoc = (mock?: Partial<User>): Partial<UserDocument> => ({
  email: mock?.email || 'john.doe@email.com',
  firstName: mock?.firstName || 'John',
  lastName: mock?.lastName || 'Doe',
  hash: mock?.hash || '23r14t35',
  salt: mock?.salt || 'ufg3u24ou34',
  username: mock?.username || 'john-doe-12345',
  bio: mock?.bio || 'description',
  profilePic: mock?.profilePic || '',
  tags: mock?.tags || [],
});

describe('UsersService', () => {
  let usersService: UsersService;
  let repo: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            updateDeviceDocument: jest.fn(),
            saveUser: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    repo = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserByEmail', () => {
    it('should get user by email', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      jest.spyOn(repo, 'findOne').mockImplementation(async () => findMockUser);

      const foundUser = await usersService.getUserByEmail('john.doe@email.com');
      expect(foundUser).toStrictEqual(findMockUser);
    });
  });

  describe('updateUserData', () => {
    it('should update a user locale information and return updated profile', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });
      jest.spyOn(repo, 'findById').mockImplementation(async () => userInfo);

      const locale = {
        languages: ['English'],
        locales: ['en-US', 'bn-BD'],
        region: 'New york',
        primaryLocale: '',
        timezone: '',
      };
      const updatedResult = Object.assign(userInfo, { locale });

      jest
        .spyOn(repo, 'findByIdAndUpdate')
        .mockImplementation(async () => updatedResult);

      const foundUser = await usersService.updateUserData(
        '6033fd87b15e6650b40e98c6',
        locale,
      );
      expect(foundUser).toStrictEqual(mapUserPrivateProfile(updatedResult));
    });
  });

  describe('isExist', () => {
    it('should return true if check exist by username', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });

      jest.spyOn(repo, 'findOne').mockImplementation(async () => userInfo);

      const foundUser = await usersService.isExist({
        username: 'john-doe-12345',
      });
      expect(foundUser).toBe(true);
    });

    it('should return true if check exist by email', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });

      jest.spyOn(repo, 'findOne').mockImplementation(async () => userInfo);

      const foundUser = await usersService.isExist({
        email: 'john.doe@email.com',
      });
      expect(foundUser).toBe(true);
    });

    it('should return false if check exist by username that does not exist', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });

      jest.spyOn(repo, 'findOne').mockImplementation(async () => null);

      const foundUser = await usersService.isExist({
        username: 'john-doe-1234',
      });
      expect(foundUser).toBe(false);
    });
  });

  describe('updateProfileUsername', () => {
    it('should update a user profile username and return updated result', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });
      const username = 'john';

      jest.spyOn(repo, 'findById').mockImplementation(async () => userInfo);

      jest.spyOn(repo, 'findOne').mockImplementation(async () => userInfo);

      const updatedResult = Object.assign(userInfo, {
        firstName: 'John',
        lastName: 'Michael',
        username,
      });

      jest
        .spyOn(repo, 'findByIdAndUpdate')
        .mockImplementation(async () => updatedResult);

      const foundUser = await usersService.updateProfileUsername(
        '6033fd87b15e6650b40e98c6',
        { username },
      );
      expect(foundUser).toStrictEqual(mapUserPrivateProfile(updatedResult));
    });
  });

  describe('updateProfileEmailAddress', () => {
    it('should update a user profile email address and return updated result', async () => {
      const findMockUser = mockUser('john.doe@email.com');
      const userInfo = Object.assign(findMockUser, {
        _id: '6033fd87b15e6650b40e98c6',
      });
      const userEmail = 'test@test.com';

      jest.spyOn(repo, 'findById').mockImplementation(async () => userInfo);

      jest.spyOn(repo, 'findOne').mockImplementation(async () => userInfo);

      const updatedResult = Object.assign(userInfo, {
        email: userEmail,
      });

      jest
        .spyOn(repo, 'findByIdAndUpdate')
        .mockImplementation(async () => updatedResult);

      const foundUser = await usersService.updateProfileEmailAddress(
        '6033fd87b15e6650b40e98c6',
        { email: userEmail },
      );
      expect(foundUser).toStrictEqual(mapUserPrivateProfile(updatedResult));
    });
  });
});
