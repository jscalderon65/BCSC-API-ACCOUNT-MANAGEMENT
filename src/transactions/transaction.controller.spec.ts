import { Test, TestingModule } from '@nestjs/testing';

import { OutgoingTransactionController } from './transaction.controller';
import { OutgoingTransactionService } from './transaction.service';

describe('OutgoingTransactionController', () => {
  let controller: OutgoingTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutgoingTransactionController],
      providers: [OutgoingTransactionService],
    }).compile();

    controller = module.get<OutgoingTransactionController>(
      OutgoingTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
