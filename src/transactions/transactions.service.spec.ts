import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repo: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: TransactionsRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repo = module.get<TransactionsRepository>(TransactionsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('It should add a new transaction and return the objects', async () => {
      const result = {
        _id: '62b01456b3c98de9c532752b',
        customerID: '62b0119332cd3b1f9cb935bc',
        inputAmount: 1,
        inputCurrency: 'CEH',
        outputAmount: 2,
        outputCurrency: 'PER',
        createdAt: '2022-06-20T06:31:50.407Z',
        updatedAt: '2022-06-20T06:31:50.407Z',
        __v: 0,
      };

      const transactionObject = {
        inputAmount: 1,
        inputCurrency: 'CEH',
        outputAmount: 2,
        outputCurrency: 'PER',
      };

      jest.spyOn(repo, 'create').mockImplementation(async () => result as any);

      const resultInfo = await service.create(
        '62b0119332cd3b1f9cb935bc',
        transactionObject,
      );

      expect(resultInfo).toHaveProperty('customerID');
      expect(resultInfo).toHaveProperty('inputAmount');
      expect(resultInfo).toHaveProperty('inputCurrency');
      expect(resultInfo).toHaveProperty('outputAmount');
      expect(resultInfo).toHaveProperty('outputCurrency');
      expect(resultInfo).toHaveProperty('_id');
      expect(resultInfo).toHaveProperty('createdAt');
      expect(resultInfo).toHaveProperty('updatedAt');
    });

    it('It should return error if payment already exist', async () => {
      const result = {
        _id: '62b01456b3c98de9c532752b',
        customerID: '62b0119332cd3b1f9cb935bc',
        inputAmount: 1,
        inputCurrency: 'CEH',
        outputAmount: 2,
        outputCurrency: 'PER',
        createdAt: '2022-06-20T06:31:50.407Z',
        updatedAt: '2022-06-20T06:31:50.407Z',
        __v: 0,
      };

      const transactionObject = {
        inputAmount: 1,
        inputCurrency: 'CEH',
        outputAmount: 2,
        outputCurrency: 'PER',
      };

      jest.spyOn(repo, 'findOne').mockImplementation(async () => result as any);
      jest.spyOn(repo, 'create').mockImplementation(async () => result as any);

      try {
        await service.create('62b0119332cd3b1f9cb935bc', transactionObject);
      } catch (error) {
        expect(error.message).toBe('Payment already exists');
      }
    });
  });

  describe('updateSingleTransaction', () => {
    it('It should update a single transaction', async () => {
      const result = {
        _id: '62b01456b3c98de9c532752b',
        customerID: '62b0119332cd3b1f9cb935bc',
        inputAmount: 1,
        inputCurrency: 'CEH',
        outputAmount: 2,
        outputCurrency: 'PER',
        createdAt: '2022-06-20T06:31:50.407Z',
        updatedAt: '2022-06-20T06:31:50.407Z',
        __v: 0,
      };

      const ExpectedResult = {
        _id: '62b01456b3c98de9c532752b',
        customerID: '62b0119332cd3b1f9cb935bc',
        inputAmount: 10,
        inputCurrency: 'CEH',
        outputAmount: 20,
        outputCurrency: 'PER',
        createdAt: '2022-06-20T06:31:50.407Z',
        updatedAt: '2022-06-20T06:31:50.407Z',
        __v: 0,
      };

      const transactionObject = {
        inputAmount: 10,
        inputCurrency: 'CEH',
        outputAmount: 20,
        outputCurrency: 'PER',
      };

      jest
        .spyOn(repo, 'updateOne')
        .mockImplementation(async () => ExpectedResult as any);

      jest.spyOn(repo, 'findOne').mockImplementation(async () => result as any);

      const resultInfo = await service.updateSingleTransaction(
        '62b0119332cd3b1f9cb935bc',
        '62b01456b3c98de9c532752b',
        transactionObject,
      );

      expect(resultInfo).toHaveProperty('customerID');
      expect(resultInfo).toHaveProperty('inputAmount');
      expect(resultInfo).toHaveProperty('inputCurrency');
      expect(resultInfo).toHaveProperty('outputAmount');
      expect(resultInfo).toHaveProperty('outputCurrency');
      expect(resultInfo).toHaveProperty('_id');
      expect(resultInfo).toHaveProperty('createdAt');
      expect(resultInfo).toHaveProperty('updatedAt');
    });
  });
});
