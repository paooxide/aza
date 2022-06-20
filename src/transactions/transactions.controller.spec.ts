import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            create: jest.fn(),
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

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a recurrent payment and return object', async () => {
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

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => result as any);

      jest.enableAutomock();
      expect(
        await controller.create('62b0119332cd3b1f9cb935bc', transactionObject),
      ).toBe(result);
    });
  });
});
