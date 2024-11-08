import { Test, TestingModule } from '@nestjs/testing';
import { OutgoingTransactionController } from './outgoing-transaction.controller';
import { OutgoingTransactionService } from './outgoing-transaction.service';

describe('OutgoingTransactionController', () => {
  let controller: OutgoingTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutgoingTransactionController],
      providers: [OutgoingTransactionService],
    }).compile();

    controller = module.get<OutgoingTransactionController>(OutgoingTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
